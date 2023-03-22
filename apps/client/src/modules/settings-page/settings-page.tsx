import { FC } from 'react';

import { NavigationPageWrapper } from '../../components/navigation-page-wrapper-component';
import styles from './setting-page.module.css';
export const SettingsPage: FC = () => {
  return (
    <NavigationPageWrapper>
      <div className={styles.container}>
        <div className={styles.menuBar}>
          <h1 className={styles.projectName}>Settings</h1>
          <div>
            <div className={styles.prop}>
              <span>Volume</span>
              <div className={styles.volumeLine}>
                <input type="range" />
              </div>
            </div>
            <div className={styles.prop}>
              <span>SFX</span>
              <div className={styles.volumeLine}>
                <input type="range" />
              </div>
            </div>
            <div className={styles.prop}>
              <span>Music</span>
              <div className={styles.volumeLine}>
                <input type="range" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
