import { VFC } from 'react';

import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import { useAuthStore } from '../../store/auth-store/auth-store';
import styles from './profile-page.module.css';

export const ProfilePage: VFC = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <NavigationPageWrapper>
      <div className={styles.container}>
        <div className={styles.userContainer}>
          <div className={styles.userProfile}></div>
          <div className={styles.username}>username</div>
          <div className={styles.rating}>rating</div>
        </div>
        <button className={styles.playButton} onClick={logout}>
          Logout
        </button>
      </div>
    </NavigationPageWrapper>
  );
};
