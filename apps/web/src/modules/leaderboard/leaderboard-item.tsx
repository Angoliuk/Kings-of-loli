import { type FC } from 'react';

import { type RouterOutputs } from '../../trpc';
import styles from './leaderboard.module.css';

type LeaderboardItemProperties = {
  user: RouterOutputs['users']['getAllUsers'][0];
  place: number;
};

export const LeaderboardItem: FC<LeaderboardItemProperties> = ({ user, place }) => {
  return (
    <div className={styles.statsWrapper} key={user.id}>
      <div className={styles.userPlace}>{place}</div>
      <div className={styles.userName}>{user.name}</div>
      <div className={styles.userScore}>{user.score}</div>
    </div>
  );
};
