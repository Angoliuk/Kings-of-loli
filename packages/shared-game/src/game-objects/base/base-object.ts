import { Team, GameObjectType } from '../../interfaces';

export type BaseGameObjectProps = {
  source: string;
  hp: number;
  team: Team;
  objectType: GameObjectType;
};

export class BaseGameObject {
  #source;
  #hp;
  #team;
  #id = Math.random().toString();
  #objectType;

  constructor({ source, hp, team, objectType }: BaseGameObjectProps) {
    this.#source = source;
    this.#objectType = objectType;
    this.#hp = hp;
    this.#team = team;
  }

  get objectType() {
    return this.#objectType;
  }

  get id() {
    return this.#id;
  }

  get source() {
    return this.#source;
  }

  get hp() {
    return this.#hp;
  }

  get team() {
    return this.#team;
  }

  receiveDamage<T extends { id: string }>(damage: number, objectsList: T[]) {
    this.#hp -= damage;
    return this.#hp < 2 ? this.killUnit(objectsList) : false;
  }

  killUnit<T extends { id: string }>(units: T[]) {
    units.map((unit, index) => unit.id === this.#id && units.splice(index, 1));
    return true;
  }
}
