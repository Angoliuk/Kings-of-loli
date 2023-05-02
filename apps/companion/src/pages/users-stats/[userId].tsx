/* eslint-disable unicorn/filename-case */
import { PageWrapper, UserStatsPage } from 'companion/components';
import { useRouter } from 'next/router';
import { type FC } from 'react';

export const UserStats: FC = () => {
  const {
    query: { userId },
  } = useRouter();

  if (!userId || Array.isArray(userId)) return null;
  return (
    <PageWrapper>
      <UserStatsPage.UserInfo userId={userId} />
      <UserStatsPage.UserGamesGeneralStats userId={userId} />
      <UserStatsPage.GetUserLongestAndShortestGames userId={userId} />
      <UserStatsPage.UserGamesList userId={userId} />
    </PageWrapper>
  );
};

export default UserStats;
