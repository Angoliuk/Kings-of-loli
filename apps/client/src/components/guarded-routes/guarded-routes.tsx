import { Navigate, Outlet } from 'react-router-dom';

import { RoutesEnum } from '../../routes/app-route/app-route-enums';

interface Properties {
  isAllowed: boolean;
  redirectLink?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  callbackFn?: Function;
}

export const GuardedRoutes = ({ isAllowed, redirectLink }: Properties) =>
  isAllowed ? <Outlet /> : <Navigate to={redirectLink ?? RoutesEnum.SignIn} />;
