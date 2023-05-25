import { GAME_FIELD } from '../../constants';
import { PatternTypes, Coordinates, UnitType, GameObjectType, Team, ActionType } from '../../interfaces';
import { isCrossingObstacleCoordinates, movePatterns } from '../../utils';
import { Action } from '../actions';
import { BaseGameObject, BaseGameObjectProperties } from '../base/base-object';

export type UnitOwnProperties = {
  damage: number;
  pattern?: PatternTypes;
  coords: Coordinates;
  energy: number;
  unitType: UnitType;
  possibleMoves: number;
};

export type UnitProperties = UnitOwnProperties & Omit<BaseGameObjectProperties, 'objectType'>;

export class Unit extends BaseGameObject {
  pattern;
  unitType;
  damage;
  coords;
  energy;
  possibleMoves;

  constructor({ source, hp, coords, damage, pattern, team, energy, possibleMoves, unitType }: UnitProperties) {
    super({
      hp: hp,
      source: source,
      team: team,
      objectType: GameObjectType.UNIT,
    });
    this.possibleMoves = possibleMoves;
    this.energy = energy;
    this.coords = coords;
    this.damage = damage;
    this.unitType = unitType;
    this.pattern = pattern ?? PatternTypes.STAR;
  }

  getPossibleActions<T extends BaseGameObject & { team: Team } & ({ coords: Coordinates } | { coords: Coordinates[] })>(
    obstacles: T[],
  ) {
    if (this.possibleMoves === 0) return [];

    return movePatterns[this.pattern](this.coords)
      .filter((actionTemplate) =>
        (actionTemplate.coords.x === this.coords.x && actionTemplate.coords.y === this.coords.y) ||
        actionTemplate.coords.x > GAME_FIELD.x ||
        actionTemplate.coords.x < 0 ||
        actionTemplate.coords.y >= GAME_FIELD.y ||
        actionTemplate.coords.y < 0 ||
        obstacles.some(
          (obstacle) => isCrossingObstacleCoordinates(actionTemplate, obstacle) && obstacle.team === this.team,
        )
          ? false
          : true,
      )
      .map((actionTemplate) => {
        const gameObjectOnActionCoordinates = obstacles.find((obstacle) =>
          isCrossingObstacleCoordinates(actionTemplate, obstacle),
        );

        return new Action({
          ...actionTemplate,
          actionType: gameObjectOnActionCoordinates ? ActionType.ATTACK : ActionType.MOVE,
          source: 'resources/img/map/tiles/point.png',
        });

        // return {
        //   ...actionTemplate,
        //   src: 'resources/img/map/tiles/point.png',
        //   type: gameObjectOnActionCoordinates ? ActionType.ATTACK : ActionType.MOVE,
        //   objectTargetType: gameObjectOnActionCoordinates?.objectType,
        // };
      });
  }
  move(coords: Coordinates) {
    this.coords = coords;
    this.possibleMoves -= 0;
  }
}
