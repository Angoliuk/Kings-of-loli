import { type ActionType, type Coordinates } from '@kol/shared-game/interfaces';
import { type FC, memo } from 'react';

import { GameObjectAction } from './action';

export type UnitAction = {
  type: ActionType;
  src: string;
} & Coordinates;

export type GameObjectActionsProperties = {
  actions: UnitAction[];
  onClick: (action: UnitAction) => void;
};

export const GameObjectActions: FC<GameObjectActionsProperties> = memo(({ actions, onClick }) => {
  return (
    <>
      {actions.map((action) => (
        <GameObjectAction key={`${action.x}-${action.y}-action`} action={action} onClick={onClick} />
      ))}
    </>
  );
});
