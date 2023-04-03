import { FC, useState } from 'react';

import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import styles from './profile-page.module.css';

export const ProfilePage: FC = () => {
  const [visibleProfile, setvisibleProfile] = useState(true);
  const [visibleLogout, setvisibleLogout] = useState(true);
  const hoverProfileHandler = () => {
    setvisibleProfile((previous) => !previous);
  };
  const hoverLogoutHandler = () => {
    setvisibleLogout((previous) => !previous);
  };

  return (
    <NavigationPageWrapper>
      <div className={styles.bg}>
        <div className={styles.content}>
          <div className={styles.userContainer}>
            <div
              className={styles.userProfile}
              onMouseOver={hoverProfileHandler}
              onFocus={hoverProfileHandler}
              onMouseOut={hoverProfileHandler}
              onBlur={hoverProfileHandler}
            >
              <div className={styles.userProfileActive} hidden={visibleProfile}></div>
            </div>
            <div className={styles.username}>username</div>
            <div className={styles.rating}>rating</div>
          </div>
          <button
            className={styles.logoutButton}
            onMouseOver={hoverLogoutHandler}
            onFocus={hoverLogoutHandler}
            onMouseOut={hoverLogoutHandler}
            onBlur={hoverLogoutHandler}
          >
            Logout
            <div className={styles.logoutButtonActive} hidden={visibleLogout}></div>
          </button>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
