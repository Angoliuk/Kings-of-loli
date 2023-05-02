import { api } from 'companion/utils/api';
import { Duration } from 'luxon';
import { type FC } from 'react';

type UserGamesGeneralStatsProps = {
  userId: string;
};
export const UserGamesGeneralStats: FC<UserGamesGeneralStatsProps> = ({ userId }) => {
  const { data: gamesDurationStats } = api.stats.getUserGamesDuration.useQuery(
    {
      userId,
    },
    {
      initialData: {
        avg: 0,
        sum: 0,
      },
    },
  );
  const { data: ratio } = api.stats.getUserRatio.useQuery(
    { userId },
    {
      initialData: {
        wins: 0,
        winRatio: '00.00',
        total: 0,
        loses: 0,
        loseRatio: '00.00',
      },
    },
  );
  return (
    <>
      <p className="text-xl text-slate-200">General:</p>
      <div className="my-4 flex w-full flex-col items-stretch justify-around rounded-xl bg-zinc-700/60 px-6 py-4 md:flex-row">
        <div className="mb-5 flex flex-col items-center justify-around rounded-lg bg-zinc-700/60 p-5 sm:mb-5 sm:w-full sm:flex-row md:mb-0 md:w-5/12 md:flex-col xl:flex-row">
          <p className="text-green-500">
            Wins: {ratio.wins} {`(${ratio.winRatio}%)`}
          </p>
          <p className="text-slate-200">Total: {ratio.total}</p>
          <p className="text-rose-500">
            Loses: {ratio.loses} {`(${ratio.loseRatio}%)`}
          </p>
        </div>
        <div className="flex flex-col items-center justify-around rounded-lg bg-zinc-700/60 p-5 sm:w-full sm:flex-row md:w-5/12 md:flex-col xl:flex-row">
          <p className="text-slate-200">
            Average: {Duration.fromMillis(gamesDurationStats.avg * 1000).toFormat("mm 'min' ss 'sec'")}
          </p>
          <p className="text-slate-200">
            Total: {Duration.fromMillis(gamesDurationStats.sum * 1000).toFormat("hh 'hours' mm 'min'")}
          </p>
        </div>
      </div>
    </>
  );
};
