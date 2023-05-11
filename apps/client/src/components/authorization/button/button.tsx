import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { AppRoutes } from '../../../routes/app-router-enum';
import styles from './button.module.css';
export const AuthorizationButton: FC = () => {
  return (
    <>
      <NavLink to={AppRoutes.SignIn} className={styles.navButtons}>
        <button className={styles.authorizationButton}>
          <h2>
            <span className={styles.buttonText}>Sign In</span>
          </h2>
        </button>
      </NavLink>
      <NavLink to={AppRoutes.SignUp} className={styles.navButtons}>
        <button className={styles.authorizationButton}>
          <h2>
            <span className={styles.buttonText}>Sign Up</span>
          </h2>
        </button>
      </NavLink>
    </>
  );
};
