import { NavLink } from 'react-router-dom';

import styles from './navigation-user-link-component.module.css';
export const NavUserLink = ({
  navLink,
  children,
}: {
  navLink: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink className={styles.navButtons} to={navLink}>
      {children}
    </NavLink>
  );
};
