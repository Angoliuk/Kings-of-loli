import { api } from 'companion/utils/api';
import { type FC } from 'react';

import { GameCard } from '../game-card';
import { Loader } from '../loader';

type GetUserLongestAndShortestGames = {
  userId: string;
};
export const GetUserLongestAndShortestGames: FC<GetUserLongestAndShortestGames> = ({ userId }) => {
  const {
    data: longestAndShortestGames,
    isFetching,
    isError,
  } = api.stats.getUserLongestAndShortestGames.useQuery({ userId });

  if (isFetching) return <Loader />;
  if (isError || !longestAndShortestGames || longestAndShortestGames.length !== 2) return null;

  return (
    <div className="flex flex-col justify-between">
      <>
        <div className="w-full">
          <p className="text-xl text-slate-200">Shortest game:</p>
          {!!longestAndShortestGames?.[0] && <GameCard game={longestAndShortestGames?.[0]} />}
        </div>
        <div className="w-full">
          <p className="text-xl text-slate-200">Longest game:</p>
          {!!longestAndShortestGames?.[1] && <GameCard game={longestAndShortestGames?.[1]} />}
        </div>
      </>
    </div>
  );
};
