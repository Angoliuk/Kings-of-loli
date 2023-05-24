import { GAME_FIELD } from '../../constants';
import { PatternTypes, Coordinates, UnitType, GameObjectType, Team, ActionType } from '../../interfaces';
import { isCrossingObstacleCoordinates, movePatterns } from '../../utils';
import { BaseGameObject, BaseGameObjectProps } from '../base/base-object';

export type UnitProperties = {
  damage: number;
  radius: number;
  pattern?: PatternTypes;
  coords: Coordinates;
  energy: number;
  unitType: UnitType;
  possibleMoves: number;
} & Omit<BaseGameObjectProps, 'objectType'>;

export class Unit extends BaseGameObject {
  #pattern;
  #unitType;
  #damage;
  #coords;
  #energy;
  #possibleMoves;

  constructor({ source, hp, coords, damage, radius, pattern, team, energy, possibleMoves, unitType }: UnitProperties) {
    super({
      hp: hp,
      source: source,
      team: team,
      objectType: GameObjectType.UNIT,
    });
    this.#possibleMoves = possibleMoves;
    this.#energy = energy;
    this.#coords = coords;
    this.#damage = damage;
    this.#unitType = unitType;
    this.#pattern = pattern ?? PatternTypes.STAR;
  }
  get damage() {
    return this.#damage;
  }
  get coords() {
    return this.#coords;
  }
  get energy() {
    return this.#energy;
  }

  getPossibleActions<T extends BaseGameObject & { team: Team } & ({ coords: Coordinates } | { coords: Coordinates[] })>(
    obstacles: T[],
  ) {
    if (this.#possibleMoves === 0) return [];

    return movePatterns[this.#pattern](this.#coords)
      .filter((action) =>
        (action.x === this.#coords.x && action.y === this.#coords.y) ||
        action.x > GAME_FIELD.x ||
        action.x < 0 ||
        action.y >= GAME_FIELD.y ||
        action.y < 0 ||
        obstacles.some((obstacle) => isCrossingObstacleCoordinates(action, obstacle) && obstacle.team === this.team)
          ? false
          : true,
      )
      .map((action) => {
        const gameObjectOnActionCoordinates = obstacles.find((obstacle) =>
          isCrossingObstacleCoordinates(action, obstacle),
        );

        return {
          ...action,
          src: 'resources/img/map/tiles/point.png',
          type: gameObjectOnActionCoordinates ? ActionType.ATTACK : ActionType.MOVE,
          objectTargetType: gameObjectOnActionCoordinates?.objectType,
        };
      });
  }
  move(coords: Coordinates) {
    this.#coords = coords;
    this.#possibleMoves -= 0;
  }
}
