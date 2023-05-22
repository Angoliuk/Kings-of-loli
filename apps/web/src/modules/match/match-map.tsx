import { type CardObject, type UnitObject } from '@kol/shared-game/game-objects';
import { ActionType, type Coordinates } from '@kol/shared-game/interfaces';
import { Container, Sprite } from '@pixi/react';
import { type FC } from 'react';

import { GameObjectActions, type UnitAction } from './actions/actions';
import { HP_ROW_LIMIT, hpBarContainerPadding, hpBarPadding } from './constants';
import { GameField } from './field/field';
import { Resources, TurnObjects, useTurn, useUser } from './match-hud';
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
  actions: UnitAction[];
  selectedUnit: UnitObject.Unit | null;
  setUnitActions: React.Dispatch<React.SetStateAction<UnitAction[]>>;
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
  const gameUnits = useUser((state) => state.units);
  const builds = useUser((state) => state.builds);
  const removeCard = useUser((state) => state.removeCard);
  const decrementResources = useUser((state) => state.decremenResources);
  const playerTeam = useUser((state) => state.playerTeam);
  const { mapTile, unit: unitSizes, castle } = useSizes();
  const TurnUpdateNewObjects = useTurn((state) => state.updateNewObjects);
  const TurnUpdateRemovedObjects = useTurn((state) => state.updateRemovedObjects);
  const TurnUpdateUpdatedObjects = useTurn((state) => state.updateUpdatedObjects);
  const TurnPalyerResources = useTurn((state) => state.setPlayerResources);
  const userEnergy = useUser((state) => state.resources.energy);
  const userCoins = useUser((state) => state.resources.coins);
  const unitActions = {
    move: (coords: UnitAction) => {
      selectedUnit?.move(coords);
      setUnitActions([]);
      setSelectedUnit(null);
      decrementResources(2, Resources.ENERGY);
      TurnPalyerResources(
        useUser((state) => state.resources.energy),
        Resources.ENERGY,
      );
      console.log('unitActions');
      TurnUpdateUpdatedObjects(selectedUnit, TurnObjects.UNITS);
    },
    attack: (coords: UnitAction) => {
      const unit = gameUnits.find((unit) => unit.coords.x === coords.x && unit.coords.y === coords.y);
      unit?.receiveDamage(selectedUnit.damage, gameUnits) && TurnUpdateRemovedObjects(unit, TurnObjects.UNITS);
    },
  };

  const buildActions = {
    move: (coords: UnitAction) => {
      selectedUnit?.move(coords),
        setUnitActions([]),
        setSelectedUnit(null),
        decrementResources(2, Resources.ENERGY),
        TurnPalyerResources(userEnergy, Resources.ENERGY);
      TurnUpdateUpdatedObjects(selectedUnit, TurnObjects.UNITS);
    },
    attack: (coords: UnitAction) =>
      builds.map(
        (build) =>
          build.coords.some((buildCoord) => buildCoord.x === coords.x && buildCoord.y === coords.y) &&
          build.receiveDamage(selectedUnit.damage, builds) &&
          TurnUpdateRemovedObjects(build, TurnObjects.BUILDING),
      ),
  };

  const unitClick = (unit: UnitObject.Unit) => {
    console.log('1    double click');
    setSelectedUnit(unit);
    setUnitActions(unit.getPossibleActions(gameUnits, builds));

    if (selectedUnit?.id === unit.id) {
      console.log('double click');

      setSelectedUnit(null);
      setUnitActions([]);
    }
  };

  const handleCardAction = (coords: UnitAction) => {
    selectedCard?.move(coords, gameUnits);
    setUnitActions([]);
    setSelectedCard(null);
    removeCard([selectedCard?.id]);
    decrementResources(selectedCard?.energy, Resources.COINS);
    TurnPalyerResources(userCoins, Resources.COINS);
    TurnUpdateNewObjects(selectedCard, TurnObjects.UNITS);
    setSelectedUnit(null);
  };

  const handleUnitAction = (coords: UnitAction) =>
    actions.some((action) => coords.x === action.x && coords.y === action.y && coords.unitType === UnitTypes.BUILD)
      ? buildActions[coords.type](coords)
      : unitActions[coords.type](coords);

  const handleMoveClick = (coords: UnitAction) => {
    selectedCard && coords.type === ActionType.MOVE
      ? handleCardAction(coords)
      : selectedUnit
      ? handleUnitAction(coords)
      : null;

    setUnitActions([]);
  };
  console.log(gameUnits, 'game');
  return (
    <>
      <GameField />

      {gameUnits.map((unit) => (
        <CreateUnit
          handleClick={() => unit.team === playerTeam && unitClick(unit)}
          scale={unitSizes.scale}
          key={`${unit.coords.x}-${unit.coords.y}-unit`}
          x={unit.coords.x * mapTile.desiredSize.width + mapTile.desiredSize.width * 0.2}
          y={unit.coords.y * mapTile.desiredSize.height + mapTile.desiredSize.height * 0.3}
          size={unitSizes.desiredSize}
          source={unit.source}
          hp={unit.hp}
        />
      ))}
      {useUser((state) => state.builds).map((unit) => (
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

      <GameObjectActions actions={actions} onClick={handleMoveClick} />
    </>
  );
};
