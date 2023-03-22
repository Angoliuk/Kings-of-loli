import React, { FC } from 'react';

import styles from './authorization-background-component.module.css';

type AuthorizationBackgroundProperties = {
  children: React.ReactNode;
};
export const AuthorizationBackground: FC<AuthorizationBackgroundProperties> = ({ children }) => {
  return <div className={styles.background}>{children}</div>;
};
