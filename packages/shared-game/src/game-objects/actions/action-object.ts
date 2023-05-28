import { ActionType, Coordinates, GameObjectType } from '../../interfaces';
import { BaseGameObject, BaseGameObjectProperties } from '../base';
import { v4 as uuid } from 'uuid';

export type ActionProperties = { coords: Coordinates; actionType: ActionType; source: string };

export class Action {
  #coords;
  #actionType;
  #source;
  #id = uuid();
  constructor({ coords, actionType, source }: ActionProperties) {
    this.#source = source;
    this.#coords = coords;
    this.#actionType = actionType;
  }

  get coords() {
    return this.#coords;
  }

  get source() {
    return this.#source;
  }

  get id() {
    return this.#id;
  }

  get actionType() {
    return this.#actionType;
  }
}
