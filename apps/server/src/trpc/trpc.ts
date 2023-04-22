import { isAuthorized } from '../middleware';
import { t } from '../trpc';

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthorized);
