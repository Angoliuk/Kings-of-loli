import { api } from 'companion/utils/api';
import Image from 'next/image';
import { type FC } from 'react';

import { SVGIcon } from '../svg-icon';

type UserInfoProps = {
  userId: string;
};
export const UserInfo: FC<UserInfoProps> = ({ userId }) => {
  const { data: user } = api.stats.getUserById.useQuery(
    {
      userId,
    },
    {
      initialData: {
        name: 'loading...',
        score: 0,
      },
    },
  );
  if (!user) {
    // TODO: modal + redirect
    return <></>;
  }
  return (
    <div className="mb-5 flex items-center">
      <Image
        alt=""
        src={'https://picsum.photos/200/300'}
        width={144}
        height={144}
        className="mr-5 h-36 w-36 rounded-full"
      />
      <div>
        <p className="text-2xl text-slate-200">{user.name}</p>
        <div className="flex">
          <SVGIcon name="cupIcon" width={16} height={16} />
          <p className="ml-2 text-lg text-slate-200">{user.score}</p>
        </div>
      </div>
    </div>
  );
};
