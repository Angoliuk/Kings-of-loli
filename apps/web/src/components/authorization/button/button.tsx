import { NavButton } from '@web/components/nav-button/nav-button';
import { AppRoutes } from '@web/routes/app-router-enum';
import { type FC } from 'react';

import styles from './button.module.css';
export const AuthorizationButton: FC = () => {
  return (
    <>
      <NavButton link={AppRoutes.SignIn} className={[styles.navButtons]}>
        <button className={styles.authorizationButton}>
          <h2>
            <span className={styles.buttonText}>Sign In</span>
          </h2>
        </button>
      </NavButton>
      <NavButton link={AppRoutes.SignUp} className={[styles.navButtons]}>
        <button className={styles.authorizationButton}>
          <h2>
            <span className={styles.buttonText}>Sign Up</span>
          </h2>
        </button>
      </NavButton>
    </>
  );
};
