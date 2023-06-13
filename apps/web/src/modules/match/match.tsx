import { type GameObjects } from '@kol/shared-game/game-objects';
import { useState } from 'react';

import { BattleHud } from './match-hud';
import { BattleMap } from './match-map';

export const Match = () => {
  const [actions, setActions] = useState<GameObjects.Action[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<GameObjects.Unit | null>(null);
  const [selectedCard, setSelectedCard] = useState<GameObjects.Card | null>(null);

  return (
    <BattleHud
      setActions={setActions}
      selectedCard={selectedCard}
      setSelectedCard={setSelectedCard}
      setSelectedUnit={setSelectedUnit}
    >
      <BattleMap
        actions={actions}
        setActions={setActions}
        setSelectedUnit={setSelectedUnit}
        selectedUnit={selectedUnit}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </BattleHud>
  );
};
