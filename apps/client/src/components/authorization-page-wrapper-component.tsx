import { FC } from 'react';

import { AuthorizationBackground } from './authorization-components/authorization-background-component/authorization-background-component';
type AuthorizationWrapperProperties = {
  children: React.ReactNode;
};

export const AuthorizationWrapper: FC<AuthorizationWrapperProperties> = ({ children }) => {
  return (
    <>
      <AuthorizationBackground>{children}</AuthorizationBackground>
    </>
  );
};
