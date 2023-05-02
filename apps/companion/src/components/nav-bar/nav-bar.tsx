import Link from 'next/link';
import { type FC } from 'react';

export const NavBar: FC = () => {
  return (
    <div className="fixed top-0 z-10 flex h-20 w-screen min-w-full items-center justify-center bg-black/70 shadow-[0_0px_20px_0px_rgba(0,0,0,0.4)] lg:left-0 lg:block lg:h-full lg:min-h-screen lg:w-1/6 lg:min-w-min">
      <Link href={'/users-stats'}>
        <p className="p-6 text-center text-slate-200 duration-75 hover:-translate-y-1 lg:mt-6">Users</p>
      </Link>
      <Link href={'/games-stats'}>
        <p className="p-6 text-center text-slate-200 duration-75 hover:-translate-y-1">Games</p>
      </Link>
    </div>
  );
};
