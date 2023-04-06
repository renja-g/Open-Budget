import { createTRPCRouter } from "~/server/api/trpc";
import { depositRouter } from "~/server/api/routers/deposit";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  deposit: depositRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
