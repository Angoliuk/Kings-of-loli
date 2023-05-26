import { GameObjects } from '../game-objects';
import { Unit } from '../game-objects/units';

export type Coordinates = {
  x: number;
  y: number;
};

export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
