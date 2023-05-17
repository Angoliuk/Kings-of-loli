import { FC, memo } from 'react';

import { Coordinates } from '../match-map';
import { GameObjectAction } from './action';

export enum UnitActionsTypes {
  ATTACK = 'attack',
  MOVE = 'move',
}

export type UnitAction = {
  type: UnitActionsTypes;
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
        <GameObjectAction
          key={`${action.x}-${action.y}-action`}
          action={action}
          onClick={onClick}
        />
      ))}
    </>
  );
});
