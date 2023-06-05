import { type GameObjects } from '@kol/shared-game/game-objects';
import { useTurnStore } from '@web/modules/match/match-store/turn-store';

export const useGameObjectActions = () => {
  const [turnAddNewObject, turnAddRemovedObject, updateCurrentPlayerResourcesBy, turnAddUpdatedObject] = useTurnStore(
    (state) => [
      state.addNewObject,
      state.addRemovedObject,
      state.updateCurrentPlayerResourcesBy,
      state.addUpdatedObject,
    ],
  );
  const putCard = (card: GameObjects.Card, action: GameObjects.Action) => {
    const newUnit = card.move(action.coords);
    turnAddRemovedObject(card); //error is here
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
