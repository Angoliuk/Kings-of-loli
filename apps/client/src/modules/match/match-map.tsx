import { Container, Sprite } from '@pixi/react';
import React, { useRef } from 'react';

import { SpriteSizes } from './utils/sprite-sizes';

const gameFieldY = 6;
const gameFieldX = 13;
const gameField = Array.from({ length: gameFieldY }, (_, yIndex) =>
  Array.from({ length: gameFieldX }, (_, xIndex) => ({
    x: xIndex,
    y: yIndex,
    src: `resources/img/map/tiles/${yIndex}/${xIndex + 1}.gif`,
  })),
);
enum UnitActionsTypes {
  ATTACK = 'attack',
  MOVE = 'move',
}
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
type Coordinates = {
  x: number;
  y: number;
};
export type UnitActions = {
  type: UnitActionsTypes;
  src: string;
} & Coordinates;

type GameUnitsProperties = {
  source: string;
  hp: number;
  type: UnitTypes;
  team: Teams;
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
} & GameUnitsProperties;

type CreateGameObjectProperties = {
  handleClick?: React.MouseEventHandler;
  hoverhandler?: React.MouseEventHandler;
  hoverOutHandler?: React.MouseEventHandler;
  size: Coordinates;
  source: string;
  hp?: number;
} & Coordinates;

type BattleMap = {
  gameUnits: Unit[];
  actions: UnitActions[];
  selected: Unit | Card | null;
  setUnitActions: React.Dispatch<React.SetStateAction<UnitActions[]>>;
  setSelected: React.Dispatch<React.SetStateAction<Unit | Card | null>>;
};
const mapTiles = new SpriteSizes(
  { width: 200, height: 200 },
  { width: (innerWidth - 40) / 13, height: (innerHeight - 290) / 6 },
);

const hpBar = new SpriteSizes({ width: 50, height: 15 }, { height: 20, width: 50 });
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
    console.log(this.#hp);
    if (this.#hp < 2) {
      this.killUnit(units);
    }
    this.#hp -= damage;
  }
  killUnit(units: Unit[]) {
    units.map((unit, index) => unit.id === this.#id && units.splice(index, 1));
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
      action.x > gameFieldX ||
      action.x < 0 ||
      action.y >= gameFieldY ||
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
  }
}

export class Card extends GameUnits {
  #radius;
  #damage;

  constructor({ damage, hp, source, type, radius, team }: CardProperties) {
    super({
      hp: hp,
      source: source,
      team: team,
      type: type,
    });
    this.#damage = damage;
    this.#radius = radius;
  }
  get damage() {
    return this.#damage;
  }
  getPossibleCardActions(units: Unit[]) {
    const possibleMoves: UnitActions[] = [];
    for (let y = 0; y < gameFieldY; y++) {
      for (let x = 0; x < Math.floor(gameFieldX / 2); x++) {
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
        source: this.source,
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
  return (
    <>
      <Container
        width={mapTiles.desiredSize.width}
        x={x - hpBar.desiredSize.width * 1.5}
        y={y - hpBar.desiredSize.height}
      >
        {hp == 1 ? (
          <Sprite
            source={'resources/img/map/units/Rectangle 41.png'}
            scale={{ x: 1, y: 1 }}
            x={mapTiles.desiredSize.width / 2 + 10}
            width={(mapTiles.desiredSize.width - hpBar.desiredSize.height) / 3}
          />
        ) : (
          Array.from({ length: hp }).map((_, index) => {
            return (
              <>
                <Sprite
                  source={'resources/img/map/units/Rectangle 41.png'}
                  scale={{ x: 1, y: 1 }}
                  width={(mapTiles.desiredSize.width - hpBar.desiredSize.height) / 3}
                  x={
                    30 +
                    ((mapTiles.desiredSize.width - hpBar.desiredSize.height) / 3) *
                      (index > 2 ? index % 3 : index) +
                    5 * (index > 2 ? index % 3 : index) +
                    (((index >= (index > 3 ? Math.floor(index / 3) : 1) * 3 && hp > 3) ||
                      hp <= 3) &&
                    hp % 3 !== 0
                      ? 25 + (index % 3)
                      : 0)
                  }
                  y={hpBar.desiredSize.height * (index + 1 > 3 ? -Math.floor((index + 1) / 3) : 0)}
                />
              </>
            );
          })
        )}
      </Container>
    </>
  );
};
export const CreateGameObject = ({
  handleClick,
  x,
  y,
  size,
  source,
  hp,
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
        scale={{ x: size.x, y: size.y }}
        image={source}
        x={x}
        y={y}
      />
    </>
  );
};

export const BattleMap = ({
  gameUnits,
  actions,
  selected,
  setSelected,
  setUnitActions,
}: BattleMap) => {
  const unitClick = (unit: Unit) => {
    if (selected?.id === unit.id) {
      setSelected(null);
      setUnitActions([]);
      return;
    }
    setSelected(unit);
    setUnitActions(unit.getPossibleActions(gameUnits));
  };
  const hadleMoveClick = (coords: UnitActions) => {
    if (!selected) return;
    coords.type === UnitActionsTypes.MOVE
      ? (selected.move(coords, gameUnits), setUnitActions([]), setSelected(null))
      : gameUnits
          .find((unit) => unit.coords.x === coords.x && unit.coords.y === coords.y)
          .receiveDamage(selected.damage, gameUnits);
    setSelected(null);
    setUnitActions([]);
  };

  return (
    <>
      {gameField.map((row) =>
        row.map(({ x, y, src }) => {
          return (
            <CreateGameObject
              source={src}
              key={`sprite-${y}-${x}`}
              x={x * mapTiles.desiredSize.width}
              y={y * mapTiles.desiredSize.height}
              size={{
                x: mapTiles.desiredSize.width / mapTiles.originalSize.width,
                y: mapTiles.desiredSize.height / mapTiles.originalSize.height,
              }}
              handleClick={() => console.log('work')}
            />
          );
        }),
      )}

      {gameUnits.map((unit) => {
        const { x, y } = unit.coords;
        return (
          <>
            <CreateGameObject
              handleClick={() => unitClick(unit)}
              size={{ x: 0.5, y: 0.5 }}
              key={`${x}-${y}-unit`}
              x={x * mapTiles.desiredSize.width}
              y={y * mapTiles.desiredSize.height}
              source={unit.source}
              hp={unit.hp}
            />
          </>
        );
      })}
      {actions.map((action) => {
        return (
          <CreateGameObject
            handleClick={() => hadleMoveClick(action)}
            size={{ x: 0.5, y: 0.5 }}
            key={`${action.x}-${action.y}-action`}
            x={action.x * mapTiles.desiredSize.width}
            y={action.y * mapTiles.desiredSize.height}
            source={
              action.type === UnitActionsTypes.ATTACK
                ? 'resources/img/map/units/shield.png'
                : 'resources/img/map/tiles/point.png'
            }
          />
        );
      })}
    </>
  );
};
