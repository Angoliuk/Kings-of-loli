import { Navigate, Outlet } from 'react-router-dom';

import { RoutesEnum } from '../../routes/app-route/app-route-enums';

type Properties = {
  isAllowed: boolean;
  redirectLink?: string;
};

export const GuardedRoutes = ({ isAllowed, redirectLink }: Properties) =>
  isAllowed ? <Outlet /> : <Navigate to={redirectLink ?? RoutesEnum.SignIn} />;
