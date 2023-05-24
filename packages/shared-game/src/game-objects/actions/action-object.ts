import { ActionType, Coordinates, GameObjectType } from '../../interfaces';
import { BaseGameObject, BaseGameObjectProps } from '../base';

type ActionProperties = { coords: Coordinates; actionType: ActionType } & Omit<BaseGameObjectProps, 'objectType'>;

export class Action extends BaseGameObject {
  #coords;
  #actionType;
  constructor({ source, hp, team, coords, actionType }: ActionProperties) {
    super({
      source: source,
      hp: hp,
      team: team,
      objectType: GameObjectType.ACTION,
    });
    this.#coords = coords;
    this.#actionType = actionType;
  }

  get coords() {
    return this.#coords;
  }

  get actionType() {
    return this.#actionType;
  }
}
