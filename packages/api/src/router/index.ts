// src/server/router/index.ts
import { t } from "../trpc";
import { adRouter } from "./ad";
import { gameRouter } from "./game";

export const appRouter = t.router({
  game: gameRouter,
  ad: adRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
