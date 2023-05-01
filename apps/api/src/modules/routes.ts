import { router } from '@api/trpc';

import { authRouter } from './auth/auth';
import { userRouter } from './user/user';

export const appRouter = router({
  auth: authRouter,
  users: userRouter,
});

export type AppRouter = typeof appRouter;
