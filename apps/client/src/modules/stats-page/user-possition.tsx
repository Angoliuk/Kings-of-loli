import { FC } from 'react';

import { UserPossitionProperties } from '../../interfaces/page-interfaces/page-interfaces';
import styles from './user-possition.module.css';
export const UserPossition: FC<UserPossitionProperties> = ({ user }) => {
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
