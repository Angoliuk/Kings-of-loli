import { NavigationPageWrapper } from '@web/components/navigation-page-wrapper/navigation-page-wrapper';
import { RangeBar } from '@web/components/range-bar/range-bar';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { type FC } from 'react';

import styles from './setting-page.module.css';

export const SettingsPage: FC = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <NavigationPageWrapper>
      <div className={styles.bg}>
        <div className={styles.content}>
          <h1 className={styles.projectName}>Settings</h1>
          <div className={styles.settings}>
            <div className={styles.volumeLine}>
              <span>Volume</span>
              <RangeBar value={user?.sound} />
            </div>
          </div>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
