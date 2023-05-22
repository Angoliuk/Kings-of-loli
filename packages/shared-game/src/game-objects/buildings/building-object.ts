import { BuildingType, Coordinates, GameObjectType } from '../../interfaces';
import { BaseGameObject, BaseGameObjectProps } from '../base/base-object';

type BuildProperties = { coords: Coordinates[]; buildingType: BuildingType } & Omit<BaseGameObjectProps, 'objectType'>;

export class Building extends BaseGameObject {
  #coords;
  #buildingType;
  constructor({ source, hp, coords, team, buildingType }: BuildProperties) {
    super({
      source: source,
      hp: hp,
      team: team,
      objectType: GameObjectType.BUILDING,
    });
    this.#coords = coords;
    this.#buildingType = buildingType;
  }
  get coords() {
    return this.#coords;
  }
}
