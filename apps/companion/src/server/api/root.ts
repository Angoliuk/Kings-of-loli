import { statsRouter } from 'companion/server/api/routers/stats';
import { createRouter } from 'companion/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createRouter({
  stats: statsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
