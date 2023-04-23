import { FC } from 'react';

import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import { useAuth } from '../../hooks/use-auth';
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
            <button className={styles.logoutButton} onClick={() => logout()}>
              Logout
            </button>
            <div className={styles.logoutButtonActive} />
          </div>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
