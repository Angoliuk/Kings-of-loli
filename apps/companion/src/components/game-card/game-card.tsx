import { type UserMatchStatsIncludeUser } from 'companion/types';
import { type RouterOutputs } from 'companion/utils/api';
import { Duration } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

import { SVGIcon } from '../svg-icon/svg-icon';

type GameCardProps = {
  game: RouterOutputs['stats']['getGamesStats'][number];
};

type GameUserStatsProps = {
  userGameStats?: UserMatchStatsIncludeUser;
};

const DeletedGameUserStats: FC = () => {
  return (
    <div>
      <div>Deleted User</div>
    </div>
  );
};

const GameUserStats: FC<GameUserStatsProps> = ({ userGameStats }) => {
  const scoreGained = Math.random() > 0.5 ? Math.floor(Math.random() * 15) : -Math.floor(Math.random() * 15);
  return userGameStats ? (
    <Link className="w-full md:w-5/12 xl:w-2/6" href={`/users-stats/${userGameStats.userId}`}>
      <div className="flex flex-row rounded-lg bg-zinc-700/60 p-5 md:flex-col lg:flex-row lg:items-center">
        <Image
          alt=""
          src={'https://picsum.photos/200/300'}
          width={80}
          height={80}
          className="h-20 w-20 self-center rounded-full"
        />
        <div className="pl-5 md:pl-0 lg:pl-5">
          <div className="mt-3 flex">
            <SVGIcon name="userIcon" width={16} height={16} />
            <p className="truncate pl-5 text-xl text-slate-200">{userGameStats.user.name}Some longer name</p>
          </div>
          <div className="flex justify-between md:mt-2 md:flex-row lg:mt-0 lg:flex-col">
            <div className="flex">
              <SVGIcon name="cupIcon" width={16} height={16} />
              <p className="truncate pl-5 text-slate-200">{userGameStats.user.score}</p>
            </div>
            <div className="flex">
              <SVGIcon name="medalIcon" width={16} height={16} />
              <p className={`truncate pl-5 ${scoreGained > 0 ? 'text-green-500' : 'text-rose-500'}`}>{scoreGained}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <DeletedGameUserStats />
  );
};
export const GameCard: FC<GameCardProps> = ({ game }) => {
  return (
    <div className="my-4 flex w-full flex-col items-center justify-between rounded-xl bg-zinc-700/60 px-6 py-4 md:flex-row">
      <GameUserStats userGameStats={game.usersMatchStats?.[0]} />
      <div className="my-5 flex flex-col md:my-0">
        <div>
          <p className="text-center text-cyan-600">
            {Duration.fromMillis(game.duration * 1000).toFormat("mm 'min' ss 'sec'")}
          </p>
        </div>
        <div className="flex justify-center">
          <SVGIcon name="swordsIcon" width={48} height={48} />
        </div>
        <div>
          <p className="text-center text-cyan-600">
            Winner:{' '}
            {game.usersMatchStats?.[0]?.isWinner
              ? game.usersMatchStats?.[0].user.name
              : game.usersMatchStats?.[1]?.user.name}
          </p>
        </div>
      </div>
      <GameUserStats userGameStats={game.usersMatchStats?.[1]} />
    </div>
  );
};
