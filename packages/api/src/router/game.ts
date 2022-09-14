import { z } from "zod";
import { t } from "../trpc";
import { convertMinutesToHourString } from "../utils/convert";
import { twitchAuthProcedure } from "../utils/twitch-auth-procedure";

type GameTwitch = {
  id: string;
  name: string;
  box_art_url: string;
};

export const gameRouter = t.router({
  all: twitchAuthProcedure.query(async ({ ctx }) => {
    const url = "https://api.twitch.tv/helix/games/top?first=6";

    const headers = {
      authorization: `Bearer ${ctx.twich.accessToken}`,
      "Client-Id": ctx.twich.clientId,
    };

    const games: GameTwitch[] = await fetch(url, {
      headers,
    })
      .then((res) => res.json())
      .then((data) => data.data as GameTwitch[])
      .then((games) =>
        games.map((game) => ({
          ...game,
          box_art_url: game.box_art_url.replace("{width}x{height}", "240x320"),
        }))
      );

    const ads = await ctx.prisma.ad.findMany({
      select: { gameId: true },
      where: { gameId: { in: games.map((game) => game.id) } },
    });

    return games.map((game) => ({
      ...game,
      ads: ads.filter((ad) => ad.gameId === game.id).length,
    }));
  }),
  adsById: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
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
});
