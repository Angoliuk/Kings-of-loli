import { VFC } from 'react';

import styles from '../../components/authorization-header/authorization-header.module.css';
import { AuthorizationHeaderProperties } from '../../interfaces/authorization-interfaces/authorization-form-health-bar-properties';
import { HealthBar } from './health-bar/health-bar';

export const AuthorizationHeader: VFC<AuthorizationHeaderProperties> = ({ health }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.gameName}>
        <span>Game Name</span>
      </h1>
      <HealthBar health={health} />
    </div>
  );
};
