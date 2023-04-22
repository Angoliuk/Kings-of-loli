import { FC } from 'react';

import { AppRoutes } from '../../../routes/app-router-enum';
import { NavButton } from '../../nav-button/nav-button';
import styles from './button.module.css';
export const AuthorizationButton: FC = () => {
  return (
    <>
      <NavButton link={AppRoutes.SignIn} className={[styles.navButtons]}>
        <button className={styles.authorizationButton}>
          <h2>
            <span className={styles.buttonSvgText}>Sign In</span>
          </h2>
        </button>
      </NavButton>
      <NavButton link={AppRoutes.SignUp} className={[styles.navButtons]}>
        <button className={styles.authorizationButton}>
          <h2>
            <span className={styles.buttonSvgText}>Sign Up</span>
          </h2>
        </button>
      </NavButton>
    </>
  );
};
