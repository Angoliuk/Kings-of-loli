/* eslint-disable unicorn/prevent-abbreviations */
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
  const [{ building: buildings, unit: units }, turnsCount, players] = useGameStore((state) => [
    state.gameObjects,
    state.turnsCount,
    state.players,
  ]);

  const checkActionPossibility =
    <T extends (...args: unknown[]) => unknown>(callback: T) =>
    (...arguments_: Parameters<T>) =>
      players[Number(turnsCount % 2 === 0)].userId === currentPlayer?.userId && callback.apply(this, arguments_);

  const putCard = checkActionPossibility((card: GameObjects.Card, action: GameObjects.Action) => {
    if (!currentPlayer || currentPlayer.coins < card.price || currentPlayer.energy < card.energy) return;
    const newUnit = card.move(action.coords);
    turnAddRemovedObject(card);
    updateCurrentPlayerResourcesBy({
      coins: -card.price,
      energy: -card.energy,
    });
    turnAddNewObject(newUnit);
  });
  const receiveDamage = <T extends GameObjects, U extends GameObjects.Unit>(
    actionTarget: T,
    targets: T[],
    selectedUnit: U,
  ) => {
    const killedTarget = selectedUnit.attack(actionTarget, targets);
    killedTarget.isKilled ? turnAddRemovedObject(killedTarget.object) : turnAddUpdatedObject(killedTarget.object);
  };
  const clickUnit = checkActionPossibility(
    (
      unit: GameObjects.Unit,
      selectedUnit: GameObjects.Unit | null,
      setSelectedUnit: React.Dispatch<React.SetStateAction<GameObjects.Unit | null>>,
      setActions: React.Dispatch<React.SetStateAction<GameObjects.Action[]>>,
      setSelectedCard: React.Dispatch<React.SetStateAction<GameObjects.Card | null>>,
    ) => {
      setSelectedCard(null);
      if (unit.team !== currentPlayer?.team) return;

      if (selectedUnit?.id === unit.id) {
        setSelectedUnit(null);
        setActions([]);
        return;
      }

      setSelectedUnit(unit);
      setActions(unit.getPossibleActions([...units, ...buildings]));
    },
  );
  return { putCard, receiveDamage, clickUnit };
};
