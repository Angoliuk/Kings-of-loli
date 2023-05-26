import { GameObjects } from '../game-objects';
import { classToPlain, serialize } from 'class-transformer';
import { Card } from '../game-objects/cards';
import { NonFunctionProperties } from './general';

export enum UnitType {
  ARCHER = 'archer',
  WARRIOR = 'warrior',
}

export enum BuildingType {
  CASTLE = 'castle',
}

export enum ActionType {
  ATTACK = 'attack',
  MOVE = 'move',
}

export enum GameObjectType {
  BUILDING = 'building',
  UNIT = 'unit',
  CARD = 'card',
}

type GameObjectsItem<T extends GameObjectType> = {
  objectName: T;
  instance: InstanceType<(typeof GameObjects)[Capitalize<T>]>;
  object: NonFunctionProperties<InstanceType<(typeof GameObjects)[Capitalize<T>]>>;
};

export type GameObjectsList = {
  [GameObjectType.BUILDING]: GameObjectsItem<GameObjectType.BUILDING>;
  [GameObjectType.CARD]: GameObjectsItem<GameObjectType.CARD>;
  [GameObjectType.UNIT]: GameObjectsItem<GameObjectType.UNIT>;
};
