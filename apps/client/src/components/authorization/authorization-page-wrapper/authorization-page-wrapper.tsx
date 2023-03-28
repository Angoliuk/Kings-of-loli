import { FC } from 'react';

import styles from './authorization-page-wrapper.module.css';

type AuthorizationWrapperProperties = {
  children: React.ReactNode;
};

export const AuthorizationWrapper: FC<AuthorizationWrapperProperties> = ({ children }) => {
  return <div className={styles.background}>{children}</div>;
};
