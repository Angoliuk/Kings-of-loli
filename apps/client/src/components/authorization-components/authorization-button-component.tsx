import { FC } from 'react';

import { RoutesEnum } from '../../routes/app-route/app-route-enums';
import { NavButton } from './authorization-nav-button-component/authorization-nav-button-componet';
export const AuthorizationButton: FC = () => {
  return (
    <>
      <NavButton link={RoutesEnum.LogIn} text="Log In" />
      <NavButton link={RoutesEnum.SignIn} text="Sign In" />
    </>
  );
};
