import { type FC } from 'react';
import { NavLink } from 'react-router-dom';

type NavUserLinkProperty = {
  link: string;
  children?: React.ReactNode;
  className: string[];
};
export const NavButton: FC<NavUserLinkProperty> = ({ link, children, className }) => {
  return (
    <NavLink className={className.join(' ')} to={link}>
      {children}
    </NavLink>
  );
};
