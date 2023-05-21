import './configs/environment';
import './database/redis';

import http from 'node:http';

import type { PrismaClient, User } from '@prisma/client';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Request, type Response } from 'express';

import { io } from './configs';
import { appRouter } from './modules/routes';
import { createTRPCContext } from './trpc';

export type TRPCContext = {
  req: Request;
  res: Response;
  user?: Omit<User, 'password'>;
  prisma: PrismaClient;
};

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: [process.env.FRONTEND_URL] }));

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  }),
);
const server = http.createServer(app);
io.attach(server);
server.listen(process.env.API_PORT, () => console.log(`Server started on port ${process.env.API_PORT}`));
