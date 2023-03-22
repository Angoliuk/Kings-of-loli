import { FC } from 'react';

import { NavigationPageWrapper } from '../../components/navigation-page-wrapper-component';
import styles from './home-page.module.css';
export const HomePage: FC = () => {
  return (
    <NavigationPageWrapper>
      <div className={styles.container}>
        <h1>
          <span className={styles.projectName}>Kings of Loli</span>
        </h1>
        <button className={styles.playButton}>Play</button>
      </div>
    </NavigationPageWrapper>
  );
};
