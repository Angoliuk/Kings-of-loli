import { FC } from 'react';

import { RouterOutputs } from '../../trpc';
import styles from './stats-page.module.css';

type LeaderboardItemProperties = {
  user: RouterOutputs['users']['getAllUsers'][0];
  place: number;
};

export const LeaderboardItem: FC<LeaderboardItemProperties> = ({ user, place }) => {
  return (
    <span className={styles.statsWrapper} key={user.id}>
      <span className={styles.userPlace}>{place}</span>
      <span className={styles.userName}>{user.name}</span>
      <span className={styles.userScore}>{user.score}</span>
    </span>
  );
};
