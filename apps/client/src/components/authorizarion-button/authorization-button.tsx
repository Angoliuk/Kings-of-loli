import { VFC } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthorizationButtonSvg } from '../../svg/button-svg/authorizatio-button-svg';
import styles from './authorization-button.module.css';

export const AuthorizationButton: VFC = () => {
  return (
    <>
      <NavLink to="/LogIn">
        <button className={styles.authorizationButton}>
          <AuthorizationButtonSvg />
          <h2>
            <span className={styles.buttonSvgText}>Log In</span>
          </h2>
        </button>
      </NavLink>
      <NavLink to="/SignUp">
        <button className={styles.authorizationButton}>
          <AuthorizationButtonSvg />
          <h2>
            <span className={styles.buttonSvgText}>Sign Up</span>
          </h2>
        </button>
      </NavLink>
    </>
  );
};
