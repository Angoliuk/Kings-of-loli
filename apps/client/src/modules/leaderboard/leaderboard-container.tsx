import { FC } from 'react';

import { trpc } from '../../trpc';
import { Leaderboard } from './leaderboard';

export const LeaderboardContainer: FC = () => {
  const { data: users, isLoading, isError } = trpc.users.getAllUsers.useQuery({ limit: 6 });

  return <Leaderboard isError={isError} isLoading={isLoading} users={users} />;
};
