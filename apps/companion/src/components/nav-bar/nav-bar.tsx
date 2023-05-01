import Link from 'next/link';
import { type FC } from 'react';

export const NavBar: FC = () => {
  return (
    <div className="z-10 h-screen w-1/6 bg-black/70 shadow-[0_0px_20px_0px_rgba(0,0,0,0.4)]">
      <Link href={'/users-stats'}>
        <p className="mt-6 p-6 text-center text-slate-200 duration-75 hover:-translate-y-1">Users</p>
      </Link>
      <Link href={'/games-stats'}>
        <p className="p-6 text-center text-slate-200 duration-75 hover:-translate-y-1">Games</p>
      </Link>
    </div>
  );
};
