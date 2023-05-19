import { useState } from 'react';

import { BattleHud } from './match-hud';
import { BattleMap, Card, Unit, UnitActions } from './match-map';

export const Match = () => {
  const [unitActions, setUnitActions] = useState<UnitActions[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  return (
    <BattleHud
      setUnitActions={setUnitActions}
      selectedCard={selectedCard}
      setSelectedCard={setSelectedCard}
    >
      <BattleMap
        actions={unitActions}
        setUnitActions={setUnitActions}
        setSelectedUnit={setSelectedUnit}
        selectedUnit={selectedUnit}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </BattleHud>
  );
};
