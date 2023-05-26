import { type GameObjects } from '@kol/shared-game/game-objects';
import { ActionType } from '@kol/shared-game/interfaces';
import { Sprite } from '@pixi/react';
import { type FC, memo } from 'react';

import { useSizes } from '../utils/sprite-sizes';

export type GameObjectActionProperties = {
  action: GameObjects.Action;
  onClick: (action: GameObjects.Action) => void;
};

export const GameObjectAction: FC<GameObjectActionProperties> = memo(({ onClick, action }) => {
  const { mapTile, unitAction } = useSizes();
  return (
    <Sprite
      click={() => onClick(action)}
      scale={unitAction.scale}
      interactive={true}
      x={action.coords.x * mapTile.desiredSize.width + mapTile.desiredSize.width * (0.25 / 2)}
      y={action.coords.y * mapTile.desiredSize.height + mapTile.desiredSize.height * (0.25 / 2)}
      {...unitAction.desiredSize}
      source={
        action.actionType === ActionType.ATTACK
          ? 'resources/img/map/units/shield.png'
          : 'resources/img/map/tiles/point.png'
      }
    />
  );
});
