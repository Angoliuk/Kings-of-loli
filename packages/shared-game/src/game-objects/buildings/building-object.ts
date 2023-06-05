import { BuildingType, Coordinates, GameObjectType } from '../../interfaces';
import { BaseGameObject, BaseGameObjectProperties } from '../base/base-object';

export type BuildingOwnProperties = {
  coords: Coordinates[];
  buildingType: BuildingType;
};

export type BuildingProperties = BuildingOwnProperties & Omit<BaseGameObjectProperties, 'objectType'>;

export class Building extends BaseGameObject {
  coords;
  buildingType;
  constructor({ source, hp, coords, team,buildingType,id }: BuildingProperties) {
    super({
      source: source,
      hp: hp,
      team: team,
      objectType: GameObjectType.BUILDING,
      id
    });
    this.coords = coords;
    this.buildingType = buildingType;
  }
}
