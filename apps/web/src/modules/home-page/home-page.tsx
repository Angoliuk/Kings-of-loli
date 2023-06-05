import { startSearch } from '@web/utils';
import { type FC } from 'react';

import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import styles from './home-page.module.css';
export const HomePage: FC = () => {
  return (
    <NavigationPageWrapper>
      <div className={styles.bg}>
        <h1>
          <span className={styles.projectName}>Kings of Loli</span>
        </h1>
        <button className={styles.playButton} onClick={startSearch}>
          Play
        </button>
      </div>
    </NavigationPageWrapper>
  );
};
