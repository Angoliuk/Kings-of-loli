import { useTimer } from '@web/hooks/use-timer';
import { trpc } from '@web/trpc';
import { getTimeFormat, startSearch, stopSearch } from '@web/utils';
import { type FC, useState } from 'react';

import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import styles from './home-page.module.css';

export const HomePage: FC = () => {
  const { startTimer, timer } = useTimer();
  const { data: userGamesStatus } = trpc.users.getUserGamesStatus.useQuery();
  const [isGameSearching, setIsGameSearching] = useState(userGamesStatus?.isSearching ?? false);

  const handlePlayButtonClick = () => {
    startTimer(userGamesStatus?.searchFrom ? Date.now() - userGamesStatus.searchFrom : 0);
    setIsGameSearching(true);
    startSearch();
  };

  const handleCancelPlayButtonClick = () => {
    setIsGameSearching(false);
    stopSearch();
  };

  return (
    <NavigationPageWrapper>
      <div className={styles.bg}>
        <h1>
          <span className={styles.projectName}>Kings of Loli</span>
        </h1>
        <button
          className={styles.playButton}
          onClick={isGameSearching ? handleCancelPlayButtonClick : handlePlayButtonClick}
        >
          <p className={isGameSearching ? styles.playButtonTextSearching : styles.playButtonText}>
            {isGameSearching
              ? `Searching... (${getTimeFormat(timer)})`
              : 'Play' + (userGamesStatus?.isInGame ? '(Continue)' : '')}
          </p>
        </button>
      </div>
    </NavigationPageWrapper>
  );
};
