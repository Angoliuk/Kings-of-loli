import { Container, Sprite } from '@pixi/react';
import React from 'react';

import { GAME_FIELD, HP_ROW_LIMIT, hpBarContainerPadding, hpBarPadding } from './constants';
import { useUser } from './match-hud';
import { useSizes } from './utils/sprite-sizes';

const gameField = Array.from({ length: GAME_FIELD.y }, (_, yIndex) =>
  Array.from({ length: GAME_FIELD.x }, (_, xIndex) => ({
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
  scale: Coordinates;
  source: string;
  hp?: number;
  size?: { width?: number; height?: number };
} & Coordinates;

type BattleMap = {
  gameUnits: Unit[];
  actions: UnitActions[];
  selected: Unit | Card | null;
  setUnitActions: React.Dispatch<React.SetStateAction<UnitActions[]>>;
  setSelected: React.Dispatch<React.SetStateAction<Unit | Card | null>>;
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
  const { hpBar, hpBarContainer } = useSizes();
  return (
    <>
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
              <>
                <Sprite
                  source={'resources/img/map/units/Rectangle 41.png'}
                  scale={hpBar.scale}
                  {...hpBar.desiredSize}
                  x={
                    (hpBar.desiredSize.width + hpBarPadding) * hpPositionInRow +
                    (isHpBarInLastRow ? 0.75 * hpBar.desiredSize.width + hpPositionInRow : 0)
                  }
                  y={1.5 * hpBar.desiredSize.height * -Math.floor(index / HP_ROW_LIMIT) - 5}
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

export const BattleMap = ({
  gameUnits,
  actions,
  selected,
  setSelected,
  setUnitActions,
}: BattleMap) => {
  const incrementGold = useUser((state) => state.incrementGold);
  const { gold }: number = useUser((state) => state.resources);
  const { mapTile, unit: unitSizes, unitAction } = useSizes();
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

    if (coords.type === UnitActionsTypes.MOVE) {
      selected.move(coords, gameUnits), setUnitActions([]), setSelected(null);
    } else {
      const dead = gameUnits
        .find((unit) => unit.coords.x === coords.x && unit.coords.y === coords.y)
        .receiveDamage(selected.damage, gameUnits);
      if (dead) {
        incrementGold(3);
      }
    }
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
              x={x * mapTile.desiredSize.width}
              y={y * mapTile.desiredSize.height}
              scale={mapTile.scale}
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
              scale={unitSizes.scale}
              key={`${x}-${y}-unit`}
              x={x * mapTile.desiredSize.width + mapTile.desiredSize.width * 0.2}
              y={y * mapTile.desiredSize.height + mapTile.desiredSize.height * 0.3}
              size={unitSizes.desiredSize}
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
            scale={unitAction.scale}
            key={`${action.x}-${action.y}-action`}
            x={action.x * mapTile.desiredSize.width + mapTile.desiredSize.width * (0.25 / 2)}
            y={action.y * mapTile.desiredSize.height + mapTile.desiredSize.height * (0.25 / 2)}
            size={unitAction.desiredSize}
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
