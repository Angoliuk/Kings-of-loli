import { Loader } from '@web/components/loader/loader';
import { NavigationPageWrapper } from '@web/components/navigation-page-wrapper/navigation-page-wrapper';
import { useAuth } from '@web/hooks/use-auth';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { type FC } from 'react';

import styles from './profile-page.module.css';

export const ProfilePage: FC = () => {
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);

  return (
    <NavigationPageWrapper>
      <div className={styles.bg}>
        <div className={styles.content}>
          <img
            src=".././../../resources/img/bg/window.png"
            alt="bg"
            style={{ width: `80vw`, height: `80vh`, position: `fixed`, zIndex: 0, imageRendering: 'pixelated' }}
          />
          <div className={styles.userContainer}>
            <div className={styles.profiles}>
              <div className={styles.userProfile} />
              <div className={styles.userProfileActive} onClick={() => Loader({ isLoading: true })} />
            </div>
            <span className={styles.username}>{user?.name}</span>
            <span className={styles.rating}>{user?.score}</span>
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
