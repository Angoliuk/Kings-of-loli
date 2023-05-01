import { type FC, type ReactNode } from 'react';

import { NavBar } from '../nav-bar/nav-bar';

type PageWrapperProps = {
  children?: ReactNode;
};

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="flex w-screen flex-row">
      <NavBar />
      <div className="h-screen min-h-screen w-5/6 bg-zinc-800/80 px-6 py-4">{children}</div>
    </div>
  );
};
