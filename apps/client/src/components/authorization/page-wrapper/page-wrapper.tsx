import { FC } from 'react';

import { HealthBar } from '../health-bar/health-bar';
import styles from './page-wrapper.module.css';

type AuthorizationWrapperProperties = {
  children: React.ReactNode;
  health: number;
};

export const AuthorizationWrapper: FC<AuthorizationWrapperProperties> = ({ children, health }) => {
  return (
    <div className={styles.background}>
      <HealthBar health={health} />
      {children}
    </div>
  );
};
