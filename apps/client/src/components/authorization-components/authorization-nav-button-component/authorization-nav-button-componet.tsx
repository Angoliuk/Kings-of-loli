import { NavLink } from 'react-router-dom';

import styles from './authorization-nav-button-component.module.css';

export const NavButton = ({ link, text }: { link: string; text: string }) => {
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
