import { initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

import { prisma } from './database';
import { TRPCContext } from './server';
import { getHeaderUser } from './services/tokens';

export const createTRPCContext = async ({ req, res }: CreateExpressContextOptions) => {
  return {
    prisma,
    user: await getHeaderUser({ req, res }),
    req,
    res,
  } as TRPCContext;
};

export const t = initTRPC.context<typeof createTRPCContext>().create();
