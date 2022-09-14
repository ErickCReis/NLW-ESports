import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

const twitchClientId = process.env.TWITCH_CLIENT_ID;
const twitchClientSecret = process.env.TWITCH_CLIENT_SECRET;

export const twitchAuthProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!twitchClientId || !twitchClientSecret) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Missing Twitch Client ID or Secret",
    });
  }

  const url = `https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchClientSecret}&grant_type=client_credentials`;

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
      twich: { clientId: twitchClientId, accessToken: access_token },
    },
  });
});
