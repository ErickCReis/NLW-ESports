import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

import { serverEnv } from "@acme/env";

export const adminMiddleware = t.middleware(async ({ ctx, next }) => {
  if (ctx.authorizationHeader !== serverEnv.ADMIN_SECRET) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Missing access token",
    });
  }

  return next({ ctx });
});

export const adminProcedure = t.procedure.use(adminMiddleware);
