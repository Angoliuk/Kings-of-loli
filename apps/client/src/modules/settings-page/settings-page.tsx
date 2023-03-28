import { FC } from 'react';

import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import styles from './setting-page.module.css';
export const SettingsPage: FC = () => {
  return (
    <NavigationPageWrapper>
      <div className={styles.container}>
        <div className={styles.menuBar}>
          <h1 className={styles.projectName}>Settings</h1>
          <div className={styles.settings}>
            <div className={styles.volumeLine}>
              <span>Volume</span>
              <input type="range" />
            </div>
            <div className={styles.volumeLine}>
              <span>SFX</span>
              <input type="range" />
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
