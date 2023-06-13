import { type FC, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type NavUserLinkProperty = {
  link: string;
  className: string[];
  src: string;
  alt: string;
  children?: ReactNode;
};
export const NavButton: FC<NavUserLinkProperty> = ({ link, className, src, alt, children }) => {
  return (
    <NavLink className={className.join(' ')} to={link}>
      <img src={src} alt={alt} width={100} />
      {children}
    </NavLink>
  );
};
