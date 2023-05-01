import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

globalForPrisma.prisma = prisma;

export type PrismaType = typeof prisma;
