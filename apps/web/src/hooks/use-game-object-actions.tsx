import { type GameObjects } from '@kol/shared-game/game-objects';
import { useGameStore } from '@web/modules/match/match-store/game-store';
import { useTurnStore } from '@web/modules/match/match-store/turn-store';

export const useGameObjectActions = () => {
  const currentPlayer = useGameStore((state) => state.getCurrentPlayer)();
  const [turnAddNewObject, turnAddRemovedObject, updateCurrentPlayerResourcesBy, turnAddUpdatedObject] = useTurnStore(
    (state) => [
      state.addNewObject,
      state.addRemovedObject,
      state.updateCurrentPlayerResourcesBy,
      state.addUpdatedObject,
    ],
  );
  const putCard = (card: GameObjects.Card, action: GameObjects.Action) => {
    if (!currentPlayer || currentPlayer.coins < card.price || currentPlayer.energy < card.energy) return;
    const newUnit = card.move(action.coords);
    turnAddRemovedObject(card);
    updateCurrentPlayerResourcesBy({
      coins: -card.price,
      energy: -card.energy,
    });
    turnAddNewObject(newUnit);
  };
  const receiveDamage = <T extends GameObjects, U extends GameObjects.Unit>(
    actionTarget: T,
    targets: T[],
    selectedUnit: U,
  ) => {
    const killedTarget = selectedUnit.attack(actionTarget, targets);
    killedTarget.isKilled ? turnAddRemovedObject(killedTarget.object) : turnAddUpdatedObject(killedTarget.object);
  };
  return { putCard, receiveDamage };
};
