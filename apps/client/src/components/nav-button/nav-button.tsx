import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface NavUserLinkProperty {
  link: string;
  children?: React.ReactNode;
  className: string;
}
export const NavButton: FC<NavUserLinkProperty> = ({ link, children, className }) => {
  return (
    <NavLink className={className} to={link}>
      {children}
    </NavLink>
  );
};
