import { Container, Sprite } from '@pixi/react';
import React, { FC } from 'react';

import { GameObjectActions, UnitAction, UnitActionsTypes } from './actions/actions';
import { GAME_FIELD, HP_ROW_LIMIT, hpBarContainerPadding, hpBarPadding } from './constants';
import { GameField } from './field/field';
import { useUser } from './match-hud';
import { useSizes } from './utils/sprite-sizes';

enum PatternTypes {
  STAR = 'star',
}
export enum Teams {
  BLUE = 'blue',
  GREEN = 'green',
}
export enum UnitTypes {
  ARCHER = 'archer',
  WARRIOR = 'warrior',
}
export type Coordinates = {
  x: number;
  y: number;
};

type GameUnitsProperties = {
  source: string;
  hp: number;
  type: UnitTypes;
  team: Teams;
  id?: number;
};

export type UnitProperties = {
  damage: number;
  radius: number;
  pattern?: PatternTypes;
  coords: Coordinates;
} & GameUnitsProperties;

type BuildProperties = { coords: Coordinates } & GameUnitsProperties;

type CardProperties = {
  damage: number;
  radius: number;
  unitSource: string;
  energy: number;
  price: number;
} & GameUnitsProperties;

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
  selectedUnit: Unit | null;
  setUnitActions: React.Dispatch<React.SetStateAction<UnitAction[]>>;
  setSelectedUnit: React.Dispatch<React.SetStateAction<Unit | null>>;
  selectedCard: Card | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<Card | null>>;
};

class GameUnits {
  #source;
  #hp;
  #type;
  #team;
  #id = Math.random();
  constructor({ source, hp, type, team }: GameUnitsProperties) {
    this.#source = source;
    this.#hp = hp;
    this.#type = type;
    this.#team = team;
  }

  get id() {
    return this.#id;
  }

  get source() {
    return this.#source;
  }

  get hp() {
    return this.#hp;
  }

  get team() {
    return this.#team;
  }
  get type() {
    return this.#type;
  }
  receiveDamage(damage: number, units: Unit[]) {
    if (this.#hp < 2) {
      return this.killUnit(units);
    }
    this.#hp -= damage;
  }
  killUnit(units: Unit[]) {
    units.map((unit, index) => unit.id === this.#id && units.splice(index, 1));
    return true;
  }
}
export class Unit extends GameUnits {
  #pattern;
  #radius;
  #damage;
  #coords;

  constructor({ source, hp, coords, damage, radius, type, pattern, team }: UnitProperties) {
    super({
      hp: hp,
      source: source,
      team: team,
      type: type,
    });
    this.#coords = coords;
    this.#damage = damage;
    this.#radius = radius;
    this.#pattern = pattern ?? PatternTypes.STAR;
  }
  get damage() {
    return this.#damage;
  }
  get coords() {
    return this.#coords;
  }
  getPossibleActions(units: Unit[]) {
    console.log(units);
    const possibleActions = patterns[this.#pattern](this.#coords).filter((action) =>
      (action.x === this.#coords.x && action.y === this.#coords.y) ||
      action.x > GAME_FIELD.x ||
      action.x < 0 ||
      action.y >= GAME_FIELD.y ||
      action.y < 0 ||
      units.some(
        (unit) =>
          unit.#coords.x === action.x && unit.#coords.y === action.y && unit.team === this.team,
      )
        ? false
        : true,
    );

    return possibleActions.map((action) => ({
      ...action,
      src: 'resources/img/map/tiles/point.png',
      type: units.some((unit) => unit.#coords.x === action.x && unit.#coords.y === action.y)
        ? UnitActionsTypes.ATTACK
        : UnitActionsTypes.MOVE,
    }));
  }
  move(coords: Coordinates) {
    this.#coords = coords;
  }
  killUnit(units: Unit[]) {
    units.map((unit, index) => unit.id === this.id && units.splice(index, 1));
    return true;
  }
}

export class Card extends GameUnits {
  #radius;
  #damage;
  #unitSource;
  #price;
  #energy;
  constructor({
    damage,
    hp,
    source,
    type,
    radius,
    team,
    unitSource,
    price,
    energy,
  }: CardProperties) {
    super({
      hp: hp,
      source: source,
      team: team,
      type: type,
    });
    this.#unitSource = unitSource;
    this.#damage = damage;
    this.#radius = radius;
    this.#price = price;
    this.#energy = energy;
  }
  get price() {
    return this.#price;
  }
  get energy() {
    return this.#energy;
  }
  get damage() {
    return this.#damage;
  }
  getPossibleCardActions(units: Unit[]) {
    const possibleMoves: UnitAction[] = [];
    for (let y = 0; y < GAME_FIELD.y; y++) {
      for (let x = 0; x < Math.floor(GAME_FIELD.x / 2); x++) {
        possibleMoves.push({
          x: x,
          y: y,
          type: UnitActionsTypes.MOVE,
          src: 'resources/img/map/tiles/point.png',
        });
      }
    }

    return possibleMoves.filter(
      (move) => !units.some((unit) => move.x === unit.coords.x && move.y === unit.coords.y),
    );
  }
  move(coords: Coordinates, units: Unit[]) {
    units.push(
      new Unit({
        coords: coords,
        damage: this.#damage,
        hp: this.hp,
        radius: this.#radius,
        source: this.#unitSource,
        team: this.team,
        type: this.type,
      }),
    );
  }
}

export class Build extends GameUnits {
  #coords;
  constructor({ source, hp, coords, type, team }: BuildProperties) {
    super({
      source: source,
      hp: hp,
      type: type,
      team: team,
    });
    this.#coords = coords;
  }
  get coords() {
    return this.#coords;
  }
}

const patterns = {
  star: ({ x, y }: Coordinates) => {
    const radius = 1;
    const unit_moves = [];
    for (let indexY = -radius; indexY <= radius; indexY++) {
      for (let indexX = -radius; indexX <= radius; indexX++) {
        const xCoord = x + indexX;
        const yCoord = y + indexY;
        if (indexX === -radius && indexY === -radius) {
          unit_moves.push({ x: xCoord - 1, y: yCoord - 1 }, { x: xCoord - 1, y: yCoord + 3 });
        } else if (indexX === radius && indexY === radius) {
          unit_moves.push({ x: xCoord + 1, y: yCoord + 1 }, { x: xCoord + 1, y: yCoord - 3 });
        }
        unit_moves.push({ x: xCoord, y: yCoord });
      }
    }

    return unit_moves;
  },
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
  const decrementCard = useUser((state) => state.decrementCard);
  const decrementEnergy = useUser((state) => state.decrementEnergy);
  const decrementGold = useUser((state) => state.decrementGold);
  const gameUnits = useUser((state) => state.units);
  const { mapTile, unit: unitSizes } = useSizes();

  const unitActions = {
    move: (coords: UnitAction) => {
      selectedUnit?.move(coords),
        setUnitActions([]),
        setSelectedUnit(null),
        decrementEnergy(selectedCard?.energy);
    },
    attack: (coords: UnitAction) =>
      gameUnits
        .find((unit) => unit.coords.x === coords.x && unit.coords.y === coords.y)
        .receiveDamage(selectedUnit.damage, gameUnits),
  };
  const unitClick = (unit: Unit) => {
    if (selectedUnit?.id === unit.id) {
      setSelectedUnit(null);
      setUnitActions([]);
    }
    setSelectedUnit(unit);
    setUnitActions(unit.getPossibleActions(gameUnits));
  };

  const handleCardAction = (coords: UnitAction) => {
    selectedCard?.move(coords, gameUnits);
    setUnitActions([]);
    setSelectedCard(null);
    decrementCard(selectedCard?.id);
    decrementGold(selectedCard?.energy);
    setSelectedUnit(null);
  };

  const handleUnitAction = (coords: UnitAction) => unitActions[coords.type](coords);

  const handleMoveClick = (coords: UnitAction) => {
    selectedUnit
      ? handleUnitAction(coords)
      : selectedCard && coords.type === UnitActionsTypes.MOVE
      ? handleCardAction(coords)
      : null;
    setUnitActions([]);
  };

  return (
    <>
      <GameField />

      {gameUnits.map((unit) => (
        <CreateUnit
          handleClick={() => unitClick(unit)}
          scale={unitSizes.scale}
          key={`${unit.coords.x}-${unit.coords.y}-unit`}
          x={unit.coords.x * mapTile.desiredSize.width + mapTile.desiredSize.width * 0.2}
          y={unit.coords.y * mapTile.desiredSize.height + mapTile.desiredSize.height * 0.3}
          size={unitSizes.desiredSize}
          source={unit.source}
          hp={unit.hp}
        />
      ))}

      <GameObjectActions actions={actions} onClick={handleMoveClick} />
    </>
  );
};
