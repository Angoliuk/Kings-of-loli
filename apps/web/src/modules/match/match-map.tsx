import { type ActionObject, type CardObject, type UnitObject } from '@kol/shared-game/game-objects';
import { ActionType, type Coordinates, GameObjectType } from '@kol/shared-game/interfaces';
import { isCrossingObstacleCoordinates, updateGameObjectsGroup } from '@kol/shared-game/utils';
import { Container, Sprite } from '@pixi/react';
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
  actions: ActionObject.Action[] | null;
  selectedUnit: UnitObject.Unit | null;
  setUnitActions: React.Dispatch<React.SetStateAction<ActionObject.Action[]>>;
  setSelectedUnit: React.Dispatch<React.SetStateAction<UnitObject.Unit | null>>;
  selectedCard: CardObject.Card | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<CardObject.Card | null>>;
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
  setUnitActions,
  setSelectedUnit,
  selectedUnit,
  selectedCard,
  setSelectedCard,
}) => {
  const [turnAddNewObject, turnAddRemovedObject, turnAddUpdatedObject, updateCurrentPlayerResourcesBy] = useTurnStore(
    (state) => [
      state.addNewObject,
      state.addRemovedObject,
      state.addUpdatedObject,
      state.updateCurrentPlayerResourcesBy,
    ],
  );
  const [{ building: buildings, unit: units }, getCurrentPlayer] = useGameStore((state) => [
    state.gameObjects,
    state.getCurrentPlayer,
  ]);
  const player = getCurrentPlayer();
  // const gameUnits = useUser((state) => state.units);
  // const builds = useUser((state) => state.builds);
  // const removeCard = useUser((state) => state.removeCard);
  // const decrementResources = useUser((state) => state.decremenResources);
  // const playerTeam = useUser((state) => state.playerTeam);
  const { mapTile, unit: unitSizes, castle } = useSizes();
  // const TurnUpdateNewObjects = useTurn((state) => state.updateNewObjects);
  // const TurnUpdateRemovedObjects = useTurn((state) => state.updateRemovedObjects);
  // const TurnUpdateUpdatedObjects = useTurn((state) => state.updateUpdatedObjects);
  // const TurnPalyerResources = useTurn((state) => state.setPlayerResources);
  // const userEnergy = useUser((state) => state.resources.energy);
  // const userCoins = useUser((state) => state.resources.coins);
  const unitActions = {
    move: (action: ActionObject.Action) => {
      if (!selectedUnit) return;
      selectedUnit.move(action.coords);
      setUnitActions([]);
      setSelectedUnit(null);
      updateCurrentPlayerResourcesBy({
        energy: -2,
      });
      // decrementResources(2, Resources.ENERGY);
      // TurnPalyerResources(
      //   useUser((state) => state.resources.energy),
      //   Resources.ENERGY,
      // );
      console.log('unitActions');
      turnAddUpdatedObject(selectedUnit);
    },
    attack: (action: ActionObject.Action) => {
      if (!selectedUnit) return;
      const unit = units.find((unit) => unit.coords.x === action.coords.x && unit.coords.y === action.coords.y);
      unit?.receiveDamage(selectedUnit.damage, units) && turnAddRemovedObject(unit);
    },
  };

  const buildActions = {
    move: (action: ActionObject.Action) => {
      if (!selectedUnit) return;
      selectedUnit.move(action.coords),
        setUnitActions([]),
        setSelectedUnit(null),
        updateCurrentPlayerResourcesBy({
          energy: -2,
        });
      // decrementResources(2, Resources.ENERGY),
      // TurnPalyerResources(userEnergy, Resources.ENERGY);
      turnAddUpdatedObject(selectedUnit);
    },
    attack: (action: ActionObject.Action) => {
      if (!selectedUnit) return;
      return buildings.map(
        (building) =>
          isCrossingObstacleCoordinates(building, action) &&
          building.receiveDamage(selectedUnit.damage, buildings) &&
          turnAddRemovedObject(building),
      );
    },
  };

  const unitClick = (unit: UnitObject.Unit) => {
    console.log('1    double click');
    setSelectedUnit(unit);
    setUnitActions(unit.getPossibleActions([units, buildings]));

    if (selectedUnit?.id === unit.id) {
      console.log('double click');

      setSelectedUnit(null);
      setUnitActions([]);
    }
  };

  const handleCardAction = (action: ActionObject.Action) => {
    if (!selectedCard) return;
    selectedCard.move(action.coords, units);
    setUnitActions([]);
    setSelectedCard(null);
    turnAddRemovedObject(selectedCard);
    // removeCard([selectedCard?.id]);
    updateCurrentPlayerResourcesBy({
      coins: selectedCard.price,
      energy: selectedCard.energy,
    });
    // decrementResources(selectedCard.energy, Resources.COINS);
    // TurnPalyerResources(userCoins, Resources.COINS);
    // SHIIIIT
    TurnUpdateNewObjects(selectedCard, TurnObjects.UNITS);
    setSelectedUnit(null);
  };

  // PISZDEC1
  // eslint-disable-next-line unicorn/prevent-abbreviations
  const handleUnitAction = (actionTemp: ActionObject.Action) => {
    if (!actions) return;
    actions.some(
      (action) =>
        action.coords.x === actionTemp.coords.x &&
        action.coords.y === actionTemp.coords.y &&
        action.unitType === GameObjectType.BUILDING,
    )
      ? buildActions[actionTemp.actionType](actionTemp)
      : unitActions[actionTemp.actionType](actionTemp);
  };

  // PISZDEC2
  const handleMoveClick = (action: ActionObject.Action) => {
    selectedCard && action.actionType === ActionType.MOVE
      ? handleCardAction(action)
      : selectedUnit
      ? handleUnitAction(action)
      : null;

    setUnitActions([]);
  };
  console.log(units, 'game');
  return (
    <>
      <GameField />

      {units.map((unit) => (
        <CreateUnit
          handleClick={() => unit.team === player?.team && unitClick(unit)}
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

      {actions && <GameObjectActions actions={actions} onClick={handleMoveClick} />}
    </>
  );
};
