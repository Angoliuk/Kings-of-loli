import { type FC } from 'react';

import { BackgroundPicker } from '../../components/background-picker/background-picker';
import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import { type RouterOutputs } from '../../trpc';
import styles from './leaderboard.module.css';
import { LeaderboardItem } from './leaderboard-item';

type LeaderboardProperties = {
  users?: RouterOutputs['users']['getAllUsers'];
  isError: boolean;
  isLoading: boolean;
};

export const Leaderboard: FC<LeaderboardProperties> = ({ users, isError, isLoading }) => {
  if (isLoading) {
    return <div className={styles.loaderText}>Wait, Hero, as soon it all comes clear.</div>;
  }

  if (isError) {
    return (
      <div className={styles.loaderText}>
        Wait, Hero, the road next to you was ambushed, but if you brave enough you can try to go.
      </div>
    );
  }
  return (
    <NavigationPageWrapper>
      <div className={styles.container}>
        <BackgroundPicker imgBackground={'resources/img/leaderboard-background/large_1.jpg'} />
        <div className={styles.leaderboard}>
          <div className={styles.content}>
            <div className={styles.gridContainer}>
              <div className={styles.topUsers}>
                {users?.splice(0, 3)?.map((user, index) => (
                  <LeaderboardItem key={user.id} user={user} place={index} />
                ))}
              </div>

              <div className={styles.aroundUser}>
                {users?.splice(3)?.map((user, index) => (
                  <LeaderboardItem key={user.id} user={user} place={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
