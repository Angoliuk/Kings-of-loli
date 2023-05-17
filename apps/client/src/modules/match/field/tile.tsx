import { Sprite } from '@pixi/react';
import { FC, memo } from 'react';

import { useSizes } from '../utils/sprite-sizes';
import { GameFieldTile } from './field';

export const Tile: FC<GameFieldTile> = memo(({ x, y, source }) => {
  const { mapTile } = useSizes();
  return (
    <Sprite
      source={source}
      x={x * mapTile.desiredSize.width}
      y={y * mapTile.desiredSize.height}
      {...mapTile.desiredSize}
      scale={mapTile.scale}
    />
  );
});
