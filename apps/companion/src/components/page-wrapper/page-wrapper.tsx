import { type FC, type ReactNode } from 'react';

import { NavBar } from '../nav-bar/nav-bar';

type PageWrapperProps = {
  children?: ReactNode;
};

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="flex w-screen min-w-full flex-row justify-end">
      <NavBar />
      <div className="mt-20 h-full min-h-screen w-screen bg-zinc-800/80 px-6 py-4 lg:mt-0 lg:w-5/6 lg:min-w-min">
        {children}
      </div>
    </div>
  );
};
