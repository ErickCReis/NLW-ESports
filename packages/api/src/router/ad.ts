import { z } from "zod";
import { t } from "../trpc";
import { convertHourStringToMinutes } from "../utils/convert";

export const adRouter = t.router({
  create: t.procedure
    .input(
      z.object({
        name: z.string(),
        yearsPlaying: z.number(),
        discord: z.string(),
        weekDays: z.array(z.number()),
        hourStart: z.string().length(5),
        hourEnd: z.string().length(5),
        useVoiceChannel: z.boolean(),
        gameId: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ad.create({
        data: {
          name: input.name,
          yearsPlaying: input.yearsPlaying,
          discord: input.discord,
          weekDays: input.weekDays,
          hourStart: convertHourStringToMinutes(input.hourStart),
          hourEnd: convertHourStringToMinutes(input.hourEnd),
          useVoiceChannel: input.useVoiceChannel,
          gameId: input.gameId,
        },
      });
    }),
  discord: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.ad.findUniqueOrThrow({
      select: { discord: true },
      where: { id: input },
    });
  }),
});
