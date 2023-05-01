import Image, { type ImageProps } from 'next/image';
import { type FC } from 'react';

import * as icons from '../../../public/svg';

export type IconsNames = keyof typeof icons;
export type SVGIconProps = { name: IconsNames } & Partial<ImageProps>;

export const SVGIcon: FC<SVGIconProps> = ({ name, ...props }) => {
  return <Image {...props} src={icons[name]} alt={name} />;
};
