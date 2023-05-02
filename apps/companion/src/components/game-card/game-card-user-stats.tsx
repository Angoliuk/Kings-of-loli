import { type UserMatchStatsIncludeUser } from 'companion/types';
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

import { SVGIcon } from '../svg-icon';

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

export const GameUserStats: FC<GameUserStatsProps> = ({ userGameStats }) => {
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
            <p className="truncate pl-5 text-xl text-slate-200">{userGameStats.user.name}</p>
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
