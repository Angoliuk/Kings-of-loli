import { useState } from 'react';

import { type UnitAction } from './actions/actions';
import { BattleHud } from './match-hud';
import { BattleMap, type Card, Teams, Unit, UnitTypes } from './match-map';

export const Match = () => {
  const [unitActions, setUnitActions] = useState<UnitAction[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [gameUnits, setGameUnits] = useState<Unit[]>([
    new Unit({
      coords: { x: 1, y: 1 },
      damage: 1,
      hp: 5,
      radius: 1,
      source: 'resources/img/map/units/Worker_green.png',
      type: UnitTypes.WARRIOR,
      team: Teams.GREEN,
    }),
  ]);
  return (
    <BattleHud
      unitsList={gameUnits}
      setUnitActions={setUnitActions}
      selectedCard={selectedCard}
      setSelectedCard={setSelectedCard}
    >
      <BattleMap
        gameUnits={gameUnits}
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
