import { ActionType } from '@kol/shared-game/interfaces';
import { Sprite } from '@pixi/react';
import { type FC, memo } from 'react';

import { useSizes } from '../utils/sprite-sizes';
import { type UnitAction } from './actions';

export type GameObjectActionProperties = {
  action: UnitAction;
  onClick: (action: UnitAction) => void;
};

export const GameObjectAction: FC<GameObjectActionProperties> = memo(({ onClick, action }) => {
  const { mapTile, unitAction } = useSizes();
  return (
    <Sprite
      click={() => onClick(action)}
      scale={unitAction.scale}
      interactive={true}
      x={action.x * mapTile.desiredSize.width + mapTile.desiredSize.width * (0.25 / 2)}
      y={action.y * mapTile.desiredSize.height + mapTile.desiredSize.height * (0.25 / 2)}
      {...unitAction.desiredSize}
      source={
        action.type === ActionType.ATTACK ? 'resources/img/map/units/shield.png' : 'resources/img/map/tiles/point.png'
      }
    />
  );
});
