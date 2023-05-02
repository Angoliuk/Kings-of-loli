import type { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { createRouter, publicProcedure } from 'companion/server/api/trpc';
import {
  type CountQueryReturn,
  type MatchStatsWithUsersStats,
  SortOrder,
  type SumAndAvgQueryReturn,
} from 'companion/types';
import { z } from 'zod';

const paginationSchema = z.object({
  limit: z.number().min(0).max(100).default(20),
  offset: z.number().min(0).max(100).default(0),
});

export const statsRouter = createRouter({
  getUserById: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx: { prisma }, input: { userId } }) => {
      const usersList = await prisma.$queryRaw<[User] | []>`
        SELECT * FROM "User"
          WHERE "User".id = ${userId}
    `;
      return usersList.length > 0 ? usersList[0] : null;
    }),
  getUsers: publicProcedure
    .input(
      z
        .object({
          scoreLimits: z.tuple([z.number(), z.number()]).default([0, 9999]),
          name: z.string().optional(),
          sortBy: z
            .object({
              field: z.nativeEnum(Prisma.UserScalarFieldEnum),
              order: z.nativeEnum(SortOrder),
            })
            .default({
              field: 'createdAt',
              order: SortOrder.DESC,
            }),
        })
        .and(paginationSchema),
    )
    .query(
      async ({
        ctx: { prisma },
        input: {
          scoreLimits,
          name,
          limit,
          offset,
          sortBy: { field, order },
        },
      }) => {
        const nameSearch = name ? `%${name}%` : '%';
        const orderBy = `${field} ${order}`;
        return await prisma.$queryRaw<User[]>`
          SELECT * FROM "User"
            WHERE "User".score BETWEEN ${scoreLimits[0]} AND ${scoreLimits[1]}
              AND "User".name LIKE ${nameSearch}
            ORDER BY ${orderBy}
            LIMIT ${limit}
            OFFSET ${offset}
      `;
      },
    ),
  getUserRatio: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ ctx: { prisma }, input: { userId } }) => {
      const [{ count: losesCount }] = await prisma.$queryRaw<CountQueryReturn>`
        SELECT COUNT(*) FROM "UserMatchStats"
          WHERE "UserMatchStats"."userId" = ${userId}
            AND "UserMatchStats"."isWinner" = FALSE
      `;

      const [{ count: totalCount }] = await prisma.$queryRaw<CountQueryReturn>`
        SELECT COUNT(*) FROM "UserMatchStats"
          WHERE "UserMatchStats"."userId" = ${userId}
      `;
      const total = Number(totalCount);
      const loses = Number(losesCount);

      return {
        winRatio: (((total - loses) / total) * 100).toFixed(2),
        loseRatio: ((loses / total) * 100).toFixed(2),
        wins: total - loses,
        loses,
        total,
      };
    }),
  getUserGamesDuration: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ ctx: { prisma }, input: { userId } }) => {
      const [{ avg, sum }] = await prisma.$queryRaw<SumAndAvgQueryReturn>`
        SELECT
          SUM("MatchStats".duration),
          AVG("MatchStats".duration)
        FROM "MatchStats"
          INNER JOIN "UserMatchStats" ON "MatchStats".id = "UserMatchStats"."matchStatsId"
            WHERE "UserMatchStats"."userId" = ${userId}`;

      return {
        sum: Number(sum),
        avg: Number(avg),
      };
    }),
  getUserLongestAndShortestGames: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ ctx: { prisma }, input: { userId } }) => {
      return prisma.$queryRaw<[MatchStatsWithUsersStats?, MatchStatsWithUsersStats?]>`
      SELECT "MatchStats".*, ARRAY_TO_JSON(
        ARRAY_AGG(
          JSONB_SET(
            TO_JSONB("UserMatchStats".*), '{user}', TO_JSONB("User".*)
          )
        )
      ) AS "usersMatchStats" FROM "MatchStats"
        INNER JOIN "UserMatchStats" ON
          "MatchStats".id = "UserMatchStats"."matchStatsId"
          AND (
            "MatchStats".duration = (SELECT MIN("MatchStats".duration) FROM "MatchStats")
            OR "MatchStats".duration = (SELECT MAX("MatchStats".duration) FROM "MatchStats")
          )
        INNER JOIN "User" ON "UserMatchStats"."userId"="User".id
        WHERE "MatchStats".id IN (
          SELECT "matchStatsId" FROM "UserMatchStats"
            WHERE "UserMatchStats"."matchStatsId"="MatchStats".id
              AND "UserMatchStats"."userId"=${userId}
        )
        GROUP BY "MatchStats"."id"
        ORDER BY "MatchStats".duration
      `;
    }),
  getUserGamesStats: publicProcedure
    .input(
      z
        .object({
          userId: z.string().min(1),
          sortBy: z
            .object({
              field: z.nativeEnum(Prisma.MatchStatsScalarFieldEnum),
              order: z.nativeEnum(SortOrder),
            })
            .default({ field: 'createdAt', order: SortOrder.DESC }),
        })
        .and(paginationSchema),
    )
    .query(
      async ({
        ctx: { prisma },
        input: {
          userId,
          limit,
          offset,
          sortBy: { field, order },
        },
      }) => {
        const orderBy = `${field} ${order}`;
        return prisma.$queryRaw<MatchStatsWithUsersStats[]>`
          SELECT "MatchStats".*, ARRAY_TO_JSON(
            ARRAY_AGG(
              JSONB_SET(
                TO_JSONB("UserMatchStats".*), '{user}', TO_JSONB("User".*)
              )
            )
          ) AS "usersMatchStats" FROM "MatchStats"
            INNER JOIN "UserMatchStats" ON "UserMatchStats"."matchStatsId"="MatchStats".id
            INNER JOIN "User" ON "UserMatchStats"."userId"="User".id
            WHERE "MatchStats".id IN (
              SELECT "matchStatsId" FROM "UserMatchStats"
                WHERE "UserMatchStats"."matchStatsId"="MatchStats".id
                  AND "UserMatchStats"."userId"=${userId}
            )
            GROUP BY "MatchStats".id
            ORDER BY ${orderBy}
            LIMIT ${limit}
            OFFSET ${offset}
          `;
      },
    ),
  getGamesStats: publicProcedure
    .input(
      z
        .object({
          sortBy: z
            .object({
              field: z.nativeEnum(Prisma.MatchStatsScalarFieldEnum),
              order: z.nativeEnum(SortOrder),
            })
            .default({
              field: 'createdAt',
              order: SortOrder.DESC,
            }),
        })
        .and(paginationSchema),
    )
    .query(
      async ({
        ctx: { prisma },
        input: {
          limit,
          offset,
          sortBy: { field, order },
        },
      }) => {
        const orderBy = `${field} ${order}`;
        return prisma.$queryRaw<MatchStatsWithUsersStats[]>`
          SELECT "MatchStats".*, ARRAY_TO_JSON(
            ARRAY_AGG(
              JSONB_SET(
                TO_JSONB("UserMatchStats".*), '{user}', TO_JSONB("User".*)
              )
            )
          ) AS "usersMatchStats" FROM "MatchStats"
            LEFT JOIN "UserMatchStats" ON "UserMatchStats"."matchStatsId"="MatchStats".id
            INNER JOIN "User" ON "UserMatchStats"."userId"="User".id
            WHERE "MatchStats".id IN (
              SELECT "matchStatsId" FROM "UserMatchStats"
                WHERE "UserMatchStats"."matchStatsId"="MatchStats".id
            )
            GROUP BY "MatchStats".id
            ORDER BY ${orderBy}
            LIMIT ${limit}
            OFFSET ${offset}
          `;
      },
    ),
});
