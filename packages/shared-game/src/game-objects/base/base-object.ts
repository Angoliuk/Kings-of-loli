import { Team, GameObjectType } from '../../interfaces';
import { v4 as uuid } from 'uuid';

export type BaseGameObjectProperties = {
  source: string;
  hp: number;
  team: Team;
  objectType: GameObjectType;
  id?: string;
};

export class BaseGameObject {
  source;
  hp;
  team;
  id;
  objectType;

  constructor({ source, hp, team, objectType, id }: BaseGameObjectProperties) {
    this.source = source;
    this.objectType = objectType;
    this.hp = hp;
    this.team = team;
    this.id = id ?? uuid();
  }

  receiveDamage<T extends { id: string }>(damage: number, objectsList: T[]) {
    this.hp -= damage;
    return this.hp < 2 ? this.killUnit(objectsList) : false;
  }

  killUnit<T extends { id: string }>(units: T[]) {
    units.map((unit, index) => unit.id === this.id && units.splice(index, 1));
    return true;
  }
}
