import { useSocket } from '@web/hooks/use-socket';
import { useState } from 'react';

import { GameObjectTypes } from '../../../../api/src/interfaces/game';
import { type UnitAction } from './actions/actions';
import { BattleHud, useUser } from './match-hud';
import { BattleMap, type Card, Teams, type Unit, UnitTypes } from './match-map';

export const Match = () => {
  const [unitActions, setUnitActions] = useState<UnitAction[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const { gameLoaded, startSearch, turn } = useSocket();

  const updatesData = [{ id: 1, update: true }];
  const oldData = [{ id: 1 }, { id: 2, asdaa: 'adsada' }, { id: 3 }];
  console.log([
    [...oldData, ...updatesData].reduce((map, object) => {
      map[object.id] = object;
      return map;
    }, {}),
  ]);
  console.log(useUser((state) => state.units));
  return (
    <BattleHud setUnitActions={setUnitActions} selectedCard={selectedCard} setSelectedCard={setSelectedCard}>
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
