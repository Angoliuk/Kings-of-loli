import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type NavUserLinkProperty = {
  link: string;
  className: string[];
  src: string;
  alt: string;
};
export const NavButton: FC<NavUserLinkProperty> = ({ link, className, src, alt }) => {
  return (
    <NavLink className={className.join(' ')} to={link}>
      <img src={src} alt={alt} width={100} />
    </NavLink>
  );
};
