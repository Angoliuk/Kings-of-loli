import { type RouterOutputs } from 'companion/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

import { SVGIcon } from '../svg-icon';
type UserCardProps = {
  user: RouterOutputs['stats']['getUsers'][number];
};
export const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <Link href={`/users-stats/${user.id}`}>
      <div className="m-5 flex items-center rounded-lg bg-zinc-700/60 p-5">
        <Image
          alt=""
          src={'https://picsum.photos/200/300'}
          width={100}
          height={100}
          className="h-20 w-20 rounded-full"
        />
        <div className="pl-5">
          <div className="flex justify-between">
            <SVGIcon name="userIcon" width={16} height={16} />
            <p className="pl-2 text-2xl text-slate-200">{user.name}</p>
          </div>
          <div className="flex">
            <SVGIcon name="cupIcon" width={16} height={16} />
            <p className="ml-2 text-lg text-slate-200">{user.score}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
