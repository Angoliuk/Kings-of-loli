import { FC } from 'react';

import { BackgroundPicker } from '../../components/background-picker/background-picker';
import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import { ScoreProperties } from '../../interfaces/leaderboard/score-properties';
import { trpc } from '../../trpc';
import styles from './stats-page.module.css';

const UserRatingsList: FC<ScoreProperties> = ({ inputData }) => {
  console.log(inputData);
  return (
    <div className={styles.gridContainer}>
      {inputData.map((user, index) => (
        <span className={styles.statsWrapper} key={user.id}>
          <span className={styles.userPlace}>{index + 1}</span>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userScore}>{user.score}</span>
        </span>
      ))}
    </div>
  );
};

export const StatsPage: FC = () => {
  const { data, isLoading, isError } = trpc.users.getAllUsers.useQuery({ limit: 6 });
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
          <div className={styles.projectName}> LeaderBoard</div>
          <div className={styles.content}>
            <UserRatingsList inputData={data} />
          </div>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
