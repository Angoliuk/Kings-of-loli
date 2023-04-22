import { FC } from 'react';

import { RoutesEnum } from '../../../routes/app-route/app-route-enums';
import { NavButton } from '../../nav-button/nav-button';
import styles from './button.module.css';
export const AuthorizationButton: FC = () => {
  return (
    <>
      <NavButton link={RoutesEnum.SignIn} className={[styles.navButtons]}>
        <button className={styles.authorizationButton}>
          <h2>
            <span className={styles.buttonSvgText}>Sign In</span>
          </h2>
        </button>
      </NavButton>
      <NavButton link={RoutesEnum.SignUp} className={[styles.navButtons]}>
        <button className={styles.authorizationButton}>
          <h2>
            <span className={styles.buttonSvgText}>Sign Up</span>
          </h2>
        </button>
      </NavButton>
    </>
  );
};
