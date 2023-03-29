import { FC } from 'react';

import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import { RangeBar } from '../../components/range-bar/range-bar';
import styles from './setting-page.module.css';

export const SettingsPage: FC = () => {
  return (
    <NavigationPageWrapper>
      <div className={styles.bg}>
        <div className={styles.content}>
          <h1 className={styles.projectName}>Settings</h1>
          <div className={styles.settings}>
            <div className={styles.volumeLine}>
              <span>Volume</span>
              <input type="range" />
            </div>
            <div className={styles.volumeLine}>
              <span>SFX</span>
              <RangeBar />
            </div>
            <div className={styles.volumeLine}>
              <span>Music</span>
              <input type="range" />
            </div>
          </div>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
