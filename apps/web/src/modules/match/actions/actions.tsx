import { type GameObjects } from '@kol/shared-game/game-objects';
import { type FC, memo } from 'react';

import { GameObjectAction } from './action';

export type GameObjectActionsProperties = {
  actions: GameObjects.Action[];
  onClick: (action: GameObjects.Action) => void;
};

export const GameObjectActions: FC<GameObjectActionsProperties> = memo(({ actions, onClick }) => {
  return (
    <>
      {actions.map((action) => (
        <GameObjectAction key={`${action.coords.x}-${action.coords.y}-action`} action={action} onClick={onClick} />
      ))}
    </>
  );
});
