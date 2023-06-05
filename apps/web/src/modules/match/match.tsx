import { type GameObjects } from '@kol/shared-game/game-objects';
import { startSearch } from '@web/hooks/socket-actions';
import { useEffect, useState } from 'react';

import { BattleHud } from './match-hud';
import { BattleMap } from './match-map';

export const Match = () => {
  const [actions, setActions] = useState<GameObjects.Action[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<GameObjects.Unit | null>(null);
  const [selectedCard, setSelectedCard] = useState<GameObjects.Card | null>(null);
  // const { gameLoaded, startSearch, turn } = useSocketActions();

  // const updatesData = [{ id: 1, update: true }];
  // const oldData = [{ id: 1 }, { id: 2, asdaa: 'adsada' }, { id: 3 }];
  // console.log([
  //   [...oldData, ...updatesData].reduce((map, object) => {
  //     map[object.id] = object;
  //     return map;
  //   }, {}),
  // ]);
  // console.log(useUser((state) => state.units));
  // useEffect(() => startSearch(), []); //прибрати
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
