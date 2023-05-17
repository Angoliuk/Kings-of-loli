import { useState } from 'react';

import { BattleHud } from './match-hud';
import { BattleMap, Card, Teams, Unit, UnitActions, UnitTypes } from './match-map';

export const Match = () => {
  const [unitActions, setUnitActions] = useState<UnitActions[]>([]);
  const [selected, setSelected] = useState<Card | Unit | null>(null);
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
      setSelected={setSelected}
      selected={selected}
    >
      <BattleMap
        gameUnits={gameUnits}
        actions={unitActions}
        setUnitActions={setUnitActions}
        selected={selected}
        setSelected={setSelected}
      />
    </BattleHud>
  );
};
