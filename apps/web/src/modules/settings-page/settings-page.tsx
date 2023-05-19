import { NavigationPageWrapper } from '@web/components/navigation-page-wrapper/navigation-page-wrapper';
import { RangeBar } from '@web/components/range-bar/range-bar';
import { type FC } from 'react';

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
              <RangeBar />
            </div>
            <div className={styles.volumeLine}>
              <span>SFX</span>
              <RangeBar />
            </div>
            <div className={styles.volumeLine}>
              <span>Music</span>
              <RangeBar />
            </div>
          </div>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
