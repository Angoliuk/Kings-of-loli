import { GameObjects } from '..';
import { GAME_FIELD } from '../../constants';
import { GameObjectType, Coordinates, ActionType, GameObjectsList } from '../../interfaces';
import { isCrossingObstacleCoordinates } from '../../utils';
import { Action } from '../actions';
import { BaseGameObject, BaseGameObjectProperties } from '../base/base-object';

type GameObjectsListOmitCard = Omit<GameObjectsList, 'card'>;

export type CardOwnProperties<T extends keyof GameObjectsListOmitCard> = {
  objectToCreate: Omit<GameObjectsListOmitCard[T]['object'], 'coords'>;
  energy: number;
  price: number;
};

export type CardProperties<T extends keyof GameObjectsListOmitCard> = CardOwnProperties<T> &
  Omit<BaseGameObjectProperties, 'objectType'>;

export class Card<T extends keyof GameObjectsListOmitCard = any> extends BaseGameObject {
  price;
  energy;
  objectToCreate;

  constructor({ hp, source, team, price, energy, objectToCreate }: CardProperties<T>) {
    super({
      objectType: GameObjectType.CARD,
      hp: hp,
      source: source,
      team: team,
    });
    this.objectToCreate = objectToCreate;
    this.price = price;
    this.energy = energy;
  }

  getPossibleCardActions<T extends BaseGameObject & ({ coords: Coordinates } | { coords: Coordinates[] })>(
    obstacles: T[],
  ) {
    const possibleMoves: Action[] = [];
    for (let y = 0; y < GAME_FIELD.y; y++) {
      for (let x = 0; x < Math.floor(GAME_FIELD.x / 2); x++) {
        const action = new Action({
          actionType: ActionType.MOVE,
          source: 'resources/img/map/tiles/point.png',
          coords: { x, y },
        });
        // TODO: do we really want to have coords as an array or a single object
        obstacles.some((obstacle) => !isCrossingObstacleCoordinates(action, obstacle)) && possibleMoves.push(action);
      }
    }

    return possibleMoves;
  }

  move<T extends keyof GameObjectsListOmitCard>(
    coords: Coordinates,
    objectsList: GameObjectsListOmitCard[T]['instance'][],
  ) {
    const newObject = new GameObjects[this.objectToCreate.objectType]({
      ...this.objectToCreate,
      coords,
    }) as GameObjectsListOmitCard[T]['instance'];
    objectsList.push(newObject);
    return newObject;
  }
}
