import { FC } from 'react';

import { UserPositionProperties } from '../../interfaces/page/page';
import styles from './user-position.module.css';
export const UserPosition: FC<UserPositionProperties> = ({ user }) => {
  const { score, name, place } = user;
  return (
    <div className={styles.player}>
      <span>
        {place}. {name}
      </span>
      <span>{score}</span>
    </div>
  );
};
