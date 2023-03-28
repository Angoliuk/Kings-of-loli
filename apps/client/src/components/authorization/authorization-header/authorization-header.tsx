import { FC } from 'react';

import { HealthBarProperties } from '../../../interfaces/authorization-form/authorization-form-health-bar-properties';
import styles from './authorization-header.module.css';
import { HealthBar } from './health-bar/health-bar';

export const AuthorizationHeader: FC<HealthBarProperties> = ({ health }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.gameName}>
        <span>Game Name</span>
      </h1>
      <HealthBar health={health} />
    </div>
  );
};
