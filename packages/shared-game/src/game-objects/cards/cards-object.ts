import { GameObjects } from '..';
import { GAME_FIELD } from '../../constants';
import { GameObjectType, Coordinates, ActionType, GameObjectsList, Team } from '../../interfaces';
import { isCrossingObstacleCoordinates, movePatterns } from '../../utils';
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

  constructor({ hp, source, team, price, energy, objectToCreate,id }: CardProperties<T>) {
    super({
      objectType: GameObjectType.CARD,
      hp: hp,
      source: source,
      team: team,
      id
    });
    this.objectToCreate = objectToCreate;
    this.price = price;
    this.energy = energy;
  }

  getPossibleCardActions<T extends BaseGameObject & ({ coords: Coordinates } | { coords: Coordinates[] })>(
    obstacles: T[],
    ) {
      return movePatterns.halfField(obstacles,this.team===Team.GREEN?'left':'right')
  }

  move<T extends keyof GameObjectsListOmitCard>(
    coords: Coordinates,
  ) {
    const newObject = new GameObjects[this.objectToCreate.objectType[0].toUpperCase() + this.objectToCreate.objectType.slice(1)]({
      ...this.objectToCreate,
      coords,
    }) as GameObjectsListOmitCard[T]['instance'];
    return newObject;
  }
}
