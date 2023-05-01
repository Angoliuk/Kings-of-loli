import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from './app-router-enum';

type GuardedRouteProperties = {
  isAllowed: boolean;
  redirectLink?: string;
};

export const GuardedRoute: FC<GuardedRouteProperties> = ({ isAllowed, redirectLink }) =>
  isAllowed ? <Outlet /> : <Navigate to={redirectLink ?? AppRoutes.SignIn} />;
