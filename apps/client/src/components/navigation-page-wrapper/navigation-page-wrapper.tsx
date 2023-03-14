import { ReactNode } from 'react';

import { NavBar } from '../../modules/nav-bar/nav-bar';

export const NavigationPageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
