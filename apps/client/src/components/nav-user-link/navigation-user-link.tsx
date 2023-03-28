import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './navigation-user-link.module.css';
interface NavUserLinkProperty {
  navLink: string;
  children: React.ReactNode;
}
export const NavUserLink: FC<NavUserLinkProperty> = ({ navLink, children }) => {
  return (
    <NavLink className={styles.navButtons} to={navLink}>
      {children}
    </NavLink>
  );
};
