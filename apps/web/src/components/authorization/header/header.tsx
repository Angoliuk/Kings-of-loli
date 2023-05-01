import { type FC } from 'react';

import styles from './header.module.css';

export const AuthorizationHeader: FC = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.gameName}>
        <span>Game Name</span>
      </h1>
    </div>
  );
};
