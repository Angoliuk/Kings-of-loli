import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Properties {
  isAllowed: boolean;
}

export const GuardedPages: React.FC<Properties> = ({ isAllowed }) => {
  return isAllowed ? <Outlet /> : <Navigate to={'/LogIn'} />;
};
