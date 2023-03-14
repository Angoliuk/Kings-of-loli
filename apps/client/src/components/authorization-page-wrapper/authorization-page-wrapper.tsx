import React from 'react';

import { AuthorizationBackground } from '../authorization-background/authorization-background';

export const AuthorizationWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthorizationBackground />
      {children}
    </>
  );
};
