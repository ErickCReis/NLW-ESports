import { z } from "zod";
import { t } from "../trpc";
import {
  twitchAuthMiddleware,
  twitchAuthProcedure,
} from "../middleware/twitch-auth";
import { convertMinutesToHourString } from "../utils/convert";
import { adminProcedure } from "../middleware/admin";

type GameTwitch = {
  id: string;
  name: string;
};

type GameIGDB = {
  id: number;
  name: string;
  cover?: {
    image_id: number;
  };
  created_at: number;
};

export const gameRouter = t.router({
  all: twitchAuthProcedure.query(async ({ ctx }) => {
    const searchSize = 50;

    const url = `https://api.twitch.tv/helix/games/top?first=${searchSize}`;

    const headers = {
      authorization: `Bearer ${ctx.twich.accessToken}`,
      "Client-Id": ctx.twich.clientId,
      "Content-Type": "application/json",
    };

    const topGamesTwitch: GameTwitch[] = await fetch(url, {
      headers,
    })
      .then((res) => res.json())
      .then((data) => data.data);

    const gamesTwitch = await ctx.prisma.game.findMany({
      select: {
        id: true,
        name: true,
        coverUrl: true,
      },
      where: {
        name: {
          in: topGamesTwitch.map((game) => game.name),
        },
      },
    });

    const gamesTwitchSorted = gamesTwitch.sort((a, b) => {
      const aIndex = topGamesTwitch.findIndex((game) => game.name === a.name);
      const bIndex = topGamesTwitch.findIndex((game) => game.name === b.name);
      return aIndex - bIndex;
    });

    const gamesWithAds = await ctx.prisma.game.findMany({
      select: {
        id: true,
        name: true,
        coverUrl: true,
        _count: {
          select: {
            ads: true,
          },
        },
      },
      orderBy: {
        ads: { _count: "desc" },
      },
      take: searchSize,
    });

    // merge games with at least one ad and games from twitch
    const games = gamesWithAds
      .filter((game) => game._count.ads > 0)
      .concat(
        gamesTwitchSorted.map((game) => ({
          ...game,
          _count: {
            ads: 0,
          },
        }))
      );

    return games.map((game) => ({
      id: game.id,
      name: game.name,
      coverUrl: game.coverUrl,
      ads: game._count.ads,
    }));
  }),
  adsById: t.procedure.input(z.number()).query(async ({ ctx, input }) => {
    const ads = await ctx.prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        hourStart: true,
        hourEnd: true,
        yearsPlaying: true,
        gameId: true,
        useVoiceChannel: true,
      },
      where: { gameId: input },
      orderBy: { createdAt: "desc" },
    });

    return ads.map((ad) => ({
      ...ad,
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }));
  }),
  sync: adminProcedure.use(twitchAuthMiddleware).mutation(async ({ ctx }) => {
    const offsetSyncIGDBConfig = await ctx.prisma.config.findUnique({
      where: { key: "offsetSyncIGDB" },
    });

    let offset = offsetSyncIGDBConfig?.value
      ? parseInt(offsetSyncIGDBConfig.value)
      : 0;

    let games: GameIGDB[] = [];
    let pageSize = 500;

    const url = "https://api.igdb.com/v4/games/";
    const headers = {
      authorization: `Bearer ${ctx.twich.accessToken}`,
      "Client-Id": ctx.twich.clientId,
      "Content-Type": "application/json",
    };

    do {
      const body = `
        fields name, cover.image_id, created_at;
        sort created_at asc;
        limit ${pageSize};
        offset ${offset};
      `;

      games = await fetch(url, {
        method: "POST",
        headers,
        body,
      }).then((res) => res.json());

      await ctx.prisma.game.createMany({
        data: games.map((game) => ({
          id: game.id,
          name: game.name,
          coverUrl: game.cover?.image_id
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : null,
        })),
        skipDuplicates: true,
      });

      offset += games.length;

      await ctx.prisma.config.upsert({
        where: { key: "offsetSyncIGDB" },
        update: {
          value: offset.toString(),
        },
        create: { key: "offsetSyncIGDB", value: offset.toString() },
      });
    } while (games.length === pageSize);
  }),
});
