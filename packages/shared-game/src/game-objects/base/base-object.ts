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
    return this.hp < 2 ? this.kill(objectsList) : false;
  }

  kill<T extends { id: string }>(objectsList: T[]) {
    objectsList.map((unit, index) => unit.id === this.id && objectsList.splice(index, 1));
    return true;
  }
}
