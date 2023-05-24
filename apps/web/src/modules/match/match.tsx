import { type ActionObject, type CardObject, type UnitObject } from '@kol/shared-game/game-objects';
import { useSocket } from '@web/hooks/use-socket';
import { useState } from 'react';

import { BattleHud } from './match-hud';
import { BattleMap } from './match-map';

export const Match = () => {
  const [unitActions, setUnitActions] = useState<ActionObject.Action[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<UnitObject.Unit | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardObject.Card | null>(null);
  // const { gameLoaded, startSearch, turn } = useSocket();

  // const updatesData = [{ id: 1, update: true }];
  // const oldData = [{ id: 1 }, { id: 2, asdaa: 'adsada' }, { id: 3 }];
  // console.log([
  //   [...oldData, ...updatesData].reduce((map, object) => {
  //     map[object.id] = object;
  //     return map;
  //   }, {}),
  // ]);
  // console.log(useUser((state) => state.units));
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
