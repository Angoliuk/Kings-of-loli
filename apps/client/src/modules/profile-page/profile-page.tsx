import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavigationPageWrapper } from '../../components/navigation-page-wrapper/navigation-page-wrapper';
import { RoutesEnum } from '../../routes/app-route/app-route-enums';
import { useAuthStore } from '../../store/auth-store/auth-store';
import { trpc } from '../../trpc';
import styles from './profile-page.module.css';

export const ProfilePage: FC = () => {
  const [visibleProfile, setvisibleProfile] = useState(true);
  const [visibleLogout, setvisibleLogout] = useState(true);
  const logout = useAuthStore((state) => state.logout);
  const { isSuccess, mutate } = trpc.auth.logout.useMutation();
  const navigate = useNavigate();
  const onLogout = () => {
    mutate();
    if (isSuccess) {
      logout();
      navigate(`${RoutesEnum.SignIn}`);
    }
  };
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
            onClick={onLogout}
          >
            Logout
            <div className={styles.logoutButtonActive} hidden={visibleLogout}></div>
          </button>
        </div>
      </div>
    </NavigationPageWrapper>
  );
};
