import { FC } from 'react';

import { NavBar } from '../modules/nav-bar/nav-bar';
type NavigationPageWrapperProperties = {
  children: React.ReactNode;
};
export const NavigationPageWrapper: FC<NavigationPageWrapperProperties> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
