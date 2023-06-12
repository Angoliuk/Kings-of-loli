import { type GameObjects } from '@kol/shared-game/game-objects';
import { ActionType, type Coordinates, GameObjectType } from '@kol/shared-game/interfaces';
import { isCrossingObstacleCoordinates } from '@kol/shared-game/utils';
import { Container, Sprite } from '@pixi/react';
import { useGameObjectActions } from '@web/hooks/use-game-object-actions';
import { type FC } from 'react';

import { GameObjectActions } from './actions/actions';
import { HP_ROW_LIMIT, hpBarContainerPadding, hpBarPadding } from './constants';
import { GameField } from './field/field';
import { useGameStore } from './match-store/game-store';
import { useTurnStore } from './match-store/turn-store';
import { useSizes } from './utils/sprite-sizes';

type CreateGameObjectProperties = {
  handleClick?: React.MouseEventHandler;
  hoverhandler?: React.MouseEventHandler;
  hoverOutHandler?: React.MouseEventHandler;
  scale: Coordinates;
  source: string;
  hp?: number;
  size?: { width?: number; height?: number };
} & Coordinates;

type BattleMap = {
  actions: GameObjects.Action[] | null;
  selectedUnit: GameObjects.Unit | null;
  setActions: React.Dispatch<React.SetStateAction<GameObjects.Action[]>>;
  setSelectedUnit: React.Dispatch<React.SetStateAction<GameObjects.Unit | null>>;
  selectedCard: GameObjects.Card | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<GameObjects.Card | null>>;
};

const CreateGameObjectHealth = ({ x, y, hp }: { hp: number } & Coordinates) => {
  const { hpBar, hpBarContainer } = useSizes();
  return (
    <Container
      {...hpBarContainer.desiredSize}
      scale={hpBarContainer.scale}
      x={x - hpBar.desiredSize.width + 0.5 * hpBarContainerPadding}
      y={y - hpBar.desiredSize.height}
    >
      {hp === 1 ? (
        <Sprite
          source={'resources/img/map/units/Rectangle 41.png'}
          scale={hpBar.scale}
          {...hpBar.desiredSize}
          x={hpBar.desiredSize.width + hpBarPadding}
          y={-5}
        />
      ) : (
        Array.from({ length: hp }).map((_, index) => {
          const hpPositionInRow = index + 1 > HP_ROW_LIMIT ? index % HP_ROW_LIMIT : index;
          const isHpBarInLastRow =
            hp < HP_ROW_LIMIT ||
            (hp > HP_ROW_LIMIT &&
              hp % HP_ROW_LIMIT !== 0 &&
              index + 1 >= Math.ceil(hp / HP_ROW_LIMIT) * (HP_ROW_LIMIT - 1) &&
              index + 1 < Math.ceil(hp / HP_ROW_LIMIT) * HP_ROW_LIMIT);
          return (
            <Sprite
              key={index}
              source={'resources/img/map/units/Rectangle 41.png'}
              scale={hpBar.scale}
              {...hpBar.desiredSize}
              x={
                (hpBar.desiredSize.width + hpBarPadding) * hpPositionInRow +
                (isHpBarInLastRow ? 0.75 * hpBar.desiredSize.width + hpPositionInRow : 0)
              }
              y={1.5 * hpBar.desiredSize.height * -Math.floor(index / HP_ROW_LIMIT) - 5}
            />
          );
        })
      )}
    </Container>
  );
};
export const CreateUnit = ({
  handleClick,
  x,
  y,
  scale,
  source,
  hp,
  size,
  hoverhandler,
  hoverOutHandler,
}: CreateGameObjectProperties) => {
  return (
    <>
      {hp && <CreateGameObjectHealth x={x} y={y} hp={hp} />}
      <Sprite
        pointerover={hoverhandler}
        pointerout={hoverOutHandler}
        interactive={true}
        pointerdown={handleClick}
        scale={scale}
        image={source}
        {...size}
        x={x}
        y={y}
      />
    </>
  );
};

export const BattleMap: FC<BattleMap> = ({
  actions,
  selectedUnit,
  selectedCard,
  setActions,
  setSelectedUnit,
  setSelectedCard,
}) => {
  const [turnAddUpdatedObject, updateCurrentPlayerResourcesBy] = useTurnStore((state) => [
    state.addUpdatedObject,
    state.updateCurrentPlayerResourcesBy,
  ]);
  const [{ building: buildings, unit: units }, getCurrentPlayer] = useGameStore((state) => [
    state.gameObjects,
    state.getCurrentPlayer,
  ]);
  const player = getCurrentPlayer();
  const { mapTile, unit: unitSizes, castle } = useSizes();
  const { putCard, receiveDamage } = useGameObjectActions();
  const handleUnitClick = (unit: GameObjects.Unit) => {
    setSelectedCard(null);
    if (unit.team !== player?.team) return;

    if (selectedUnit?.id === unit.id) {
      setSelectedUnit(null);
      setActions([]);
      return;
    }

    setSelectedUnit(unit);
    setActions(unit.getPossibleActions([...units, ...buildings]));
  };

  const handleActionClick = (action: GameObjects.Action) => {
    if (selectedCard) {
      putCard(selectedCard, action);
    }
    if (player && selectedUnit && player.energy >= selectedUnit.energy) {
      console.log(selectedUnit.energy, 'selectedUnirAnarge');
      updateCurrentPlayerResourcesBy({
        energy: -selectedUnit.energy,
      });
      if (action.actionType === ActionType.MOVE) {
        units.find((unit) => unit.id === selectedUnit.id)?.move(action.coords);
        turnAddUpdatedObject(selectedUnit);
      } else {
        const actionTarget = [...units, ...buildings].find((target) => isCrossingObstacleCoordinates(target, action));
        actionTarget && actionTarget.objectType === GameObjectType.BUILDING
          ? receiveDamage(actionTarget, buildings, selectedUnit)
          : receiveDamage(actionTarget, units, selectedUnit);
        // selectedUnit.attack(actionTarget, actionTarget.objectType === GameObjectType.BUILDING ? buildings : units);
        // turnAddRemovedObject(actionTarget);
      }
    }
    setActions([]);
    setSelectedCard(null);
    setSelectedUnit(null);
  };

  // const unitActions = {
  //   move: (action: GameObjects.Action) => {
  //     if (!selectedUnit) return;
  //     selectedUnit.move(action.coords);
  //     setActions([]);
  //     setSelectedUnit(null);
  //     updateCurrentPlayerResourcesBy({
  //       energy: -2,
  //     });
  //     turnAddUpdatedObject(selectedUnit);
  //   },
  //   attack: (action: GameObjects.Action) => {
  //     if (!selectedUnit) return;
  //     const unit = units.find((unit) => unit.coords.x === action.coords.x && unit.coords.y === action.coords.y);
  //     unit?.receiveDamage(selectedUnit.damage, units) && turnAddRemovedObject(unit);
  //   },
  // };

  // const buildActions = {
  //   move: (action: GameObjects.Action) => {
  //     if (!selectedUnit) return;
  //     selectedUnit.move(action.coords),
  //       setActions([]),
  //       setSelectedUnit(null),
  //       updateCurrentPlayerResourcesBy({
  //         energy: -2,
  //       });
  //     turnAddUpdatedObject(selectedUnit);
  //   },
  //   attack: (action: GameObjects.Action) => {
  //     if (!selectedUnit) return;
  //     return buildings.map(
  //       (building) =>
  //         isCrossingObstacleCoordinates(building, action) &&
  //         building.receiveDamage(selectedUnit.damage, buildings) &&
  //         turnAddRemovedObject(building),
  //     );
  //   },
  // };

  // const handlePutCard = (action: GameObjects.Action) => {
  //   if (!selectedCard) return;
  //   const createdObject = selectedCard.move(action.coords, units);
  //   setActions([]);
  //   setSelectedCard(null);
  //   turnAddRemovedObject(selectedCard);
  //   updateCurrentPlayerResourcesBy({
  //     coins: selectedCard.price,
  //     energy: selectedCard.energy,
  //   });
  //   turnAddNewObject(createdObject);
  //   setSelectedUnit(null);
  // };

  // PISZDEC1
  // eslint-disable-next-line unicorn/prevent-abbreviations
  // const handleUnitAction = (actionTemp: GameObjects.Action) => {
  //   if (!actions) return;
  //   actions.some(
  //     (action) =>
  //       action.coords.x === actionTemp.coords.x &&
  //       action.coords.y === actionTemp.coords.y &&
  //       action.unitType === GameObjectType.BUILDING,
  //   )
  //     ? buildActions[actionTemp.actionType](actionTemp)
  //     : unitActions[actionTemp.actionType](actionTemp);
  // };

  // PISZDEC2
  // const handleActionClick = (action: GameObjects.Action) => {
  //   selectedCard && action.actionType === ActionType.MOVE
  //     ? handlePutCard(action)
  //     : selectedUnit
  //     ? handleUnitAction(action)
  //     : null;

  //   setActions([]);
  // };

  return (
    <>
      <GameField />

      {units.map((unit) => (
        <CreateUnit
          handleClick={() => handleUnitClick(unit)}
          scale={unitSizes.scale}
          key={`${unit.coords.x}-${unit.coords.y}-unit`}
          x={unit.coords.x * mapTile.desiredSize.width + mapTile.desiredSize.width * 0.2}
          y={unit.coords.y * mapTile.desiredSize.height + mapTile.desiredSize.height * 0.3}
          size={unitSizes.desiredSize}
          source={unit.source}
          hp={unit.hp}
        />
      ))}
      {buildings.map((unit) => (
        <CreateUnit
          scale={castle.scale}
          key={`${unit.coords[0].x}-${unit.coords[0].y}-build`}
          x={unit.coords[0].x * mapTile.desiredSize.width + mapTile.desiredSize.width * 0.2}
          y={unit.coords[0].y * mapTile.desiredSize.height + mapTile.desiredSize.height * 0.3}
          size={castle.desiredSize}
          source={unit.source}
          hp={unit.hp}
        />
      ))}

      {actions && <GameObjectActions actions={actions} onClick={handleActionClick} />}
    </>
  );
};
