import { NavigationPageWrapper } from '@web/components/navigation-page-wrapper/navigation-page-wrapper';
import { useAuth } from '@web/hooks/use-auth';
import { type FC } from 'react';

import styles from './profile-page.module.css';

export const ProfilePage: FC = () => {
  const { logout } = useAuth();

  return (
    <NavigationPageWrapper>
      <div className={styles.bg}>
        <div className={styles.content}>
          <div className={styles.userContainer}>
            <div className={styles.profiles}>
              <div className={styles.userProfile} />
              <div className={styles.userProfileActive} />
            </div>
            <div className={styles.username}>username</div>
            <div className={styles.rating}>rating</div>
          </div>
          <div className={styles.buttons}>
            <div className={styles.logoutButton}>Logout</div>
            <button className={styles.logoutButtonActive} onClick={() => logout()} />
          </div>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
