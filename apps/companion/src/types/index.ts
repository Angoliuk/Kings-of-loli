import { type MatchStats, type User, type UserMatchStats } from '@prisma/client';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
export type UserMatchStatsIncludeUser = UserMatchStats & { user: User };

export type MatchStatsWithUsersStats = MatchStats & {
  usersMatchStats?: [UserMatchStatsIncludeUser?, UserMatchStatsIncludeUser?];
};

export type CountQueryReturn = [{ count: bigint }];
export type SumAndAvgQueryReturn = [{ sum: bigint; avg: bigint }];
