import { initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

import { prisma } from './database';
import { getHeaderUser } from './services/tokens';

export const createTRPCContext = async ({ req, res }: CreateExpressContextOptions) => {
  return {
    prisma,
    user: await getHeaderUser({ req, res }),
    req,
    res,
  };
};

export const t = initTRPC.context<typeof createTRPCContext>().create();
