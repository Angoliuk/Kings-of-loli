import { api } from 'companion/utils/api';
import { type FC } from 'react';

import { GameCard } from '../game-card';
import { ListWrapper } from '../list-wrapper';

type UserGamesListProps = {
  userId: string;
};
export const UserGamesList: FC<UserGamesListProps> = ({ userId }) => {
  const {
    data: gamesList,
    error,
    isLoading: isFirstLoading,
    isFetching: isFetchingMore,
    isError,
    isRefetching,
  } = api.stats.getUserGamesStats.useQuery({
    userId,
  });
  return (
    <>
      <p className="text-xl text-slate-200">All games:</p>
      <ListWrapper
        data={gamesList}
        isError={isError}
        isFetchingMore={isFetchingMore}
        isFirstLoading={isFirstLoading}
        isRefetching={isRefetching}
        error={error?.message}
        listItem={(game) => <GameCard game={game} />}
      />
    </>
  );
};
