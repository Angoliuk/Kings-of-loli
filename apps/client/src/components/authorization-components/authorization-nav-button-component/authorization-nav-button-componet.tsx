import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './authorization-nav-button-component.module.css';

interface NavButtonProperty {
  link: string;
  text: string;
}
export const NavButton: FC<NavButtonProperty> = ({ link, text }) => {
  return (
    <NavLink to={link}>
      <button className={styles.authorizationButton}>
        <h2>
          <span className={styles.buttonSvgText}>{text}</span>
        </h2>
      </button>
    </NavLink>
  );
};
