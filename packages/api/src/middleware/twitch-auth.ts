import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

import { serverEnv } from "@acme/env";

export const twitchAuthMiddleware = t.middleware(async ({ ctx, next }) => {
  const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = serverEnv;

  const url = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

  const { access_token } = await fetch(url, { method: "POST" }).then((res) =>
    res.json()
  );

  if (!access_token) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Missing access token",
    });
  }

  return next({
    ctx: {
      ...ctx,
      twich: { clientId: TWITCH_CLIENT_ID, accessToken: access_token },
    },
  });
});

export const twitchAuthProcedure = t.procedure.use(twitchAuthMiddleware);
