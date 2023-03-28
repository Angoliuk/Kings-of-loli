import { FC } from 'react';

import { BackgroundPicker } from '../../components/background-picker/background-picker';
import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import styles from './stats-page.module.css';

export const StatsPage: FC = () => {
  return (
    <NavigationPageWrapper>
      <div className={styles.container}>
        <BackgroundPicker imgBackground={'resources/img/leaderboard-background/large_1.jpg'} />
        <div className={styles.leaderboard}>
          <h1>
            <span className={styles.projectName}> leaderboard</span>
          </h1>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
