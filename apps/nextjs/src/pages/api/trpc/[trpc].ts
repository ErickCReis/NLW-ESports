// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter, createContext } from "@acme/api";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  responseMeta({ paths, type, errors }) {
    const allPublic = paths && paths.every((path) => path.includes("game"));
    const allOk = errors.length === 0;
    const isQuery = type === "query";
    if (allPublic && allOk && isQuery) {
      // cache request for 1 day + revalidate once every second
      const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
      return {
        headers: {
          "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
        },
      };
    }
    return {};
  },
});
