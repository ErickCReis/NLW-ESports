import { z } from "zod";
import { t } from "../trpc";
import { convertHourStringToMinutes } from "../utils/convert";

export const adRouter = t.router({
  create: t.procedure
    .input(
      z.object({
        name: z.string().min(1, { message: "Required" }),
        yearsPlaying: z.number(),
        discord: z.string().min(1, { message: "Required" }),
        weekDays: z.array(z.number()),
        hourStart: z
          .string()
          .regex(/\d\d:\d\d/, { message: "Invalid format" })
          .transform(convertHourStringToMinutes),
        hourEnd: z
          .string()
          .regex(/\d\d:\d\d/, { message: "Invalid format" })
          .transform(convertHourStringToMinutes),
        useVoiceChannel: z
          .boolean()
          .optional()
          .transform((v) => v ?? false),
        gameId: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ad.create({ data: input });
    }),
  discord: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.ad.findUniqueOrThrow({
      select: { discord: true },
      where: { id: input },
    });
  }),
});
