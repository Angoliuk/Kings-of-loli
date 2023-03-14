import { BackgroundPicker } from '../../components/background-picker/background-picker';
import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import { leaderboardData } from '../../database/leaderboard-database';
import { UserPossitionProperties } from '../../interfaces/page-interfaces/page-interfaces';
import styles from './stats-page.module.css';

const UserPossition = ({ user }: UserPossitionProperties) => {
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
export const StatsPage = () => {
  return (
    <NavigationPageWrapper>
      <div className={styles.container}>
        <BackgroundPicker imgBackground={'src/img/leaderboard-background/large_1.jpg'} />
        <div className={styles.leaderboard}>
          <h1>
            <span className={styles.projectName}> leaderboard</span>
          </h1>
          {leaderboardData.users.map((user) => (
            <UserPossition user={user} key={user.place} />
          ))}
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
