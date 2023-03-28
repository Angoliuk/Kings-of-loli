import { FC } from 'react';

import { RoutesEnum } from '../../../routes/app-route/app-route-enums';
import { NavButton } from '../authorization-nav-button/authorization-nav-button';
export const AuthorizationButton: FC = () => {
  return (
    <>
      <NavButton link={RoutesEnum.SignIn} text="Sign In" />
      <NavButton link={RoutesEnum.SignUp} text="Sign Up" />
    </>
  );
};
