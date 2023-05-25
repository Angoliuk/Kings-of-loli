import { Building } from '../game-objects/buildings';
import { Card } from '../game-objects/cards';
import { Unit } from '../game-objects/units';
import { GameObjectType } from './game-objects';

export enum Team {
  BLUE = 'blue',
  GREEN = 'green',
}

export type Player = {
  coins: number;
  energy: number;
  userId: string;
  team: string;
};

export type TurnGameObjects = {
  [GameObjectType.CARD]: Card;
  [GameObjectType.BUILDING]: Building;
  [GameObjectType.UNIT]: Unit;
};

export type TurnGameObjectsLists = {
  [GameObjectType.CARD]: Card[];
  [GameObjectType.BUILDING]: Building[];
  [GameObjectType.UNIT]: Unit[];
};

export type TurnRemovedGameObjects = {
  [GameObjectType.CARD]: string[];
  [GameObjectType.BUILDING]: string[];
  [GameObjectType.UNIT]: string[];
};

export type Game = {
  id: string;
  players: [Player, Player];
  gameObjects: TurnGameObjectsLists;
  isFinished: boolean;
  winnedUserId?: string;
  turnsCount: number;
  turns: TurnFromServer[];
};

export type GameCompactFromServer = {
  turnsCount: number;
  id: string;
  isFinished: boolean;
  winnedUserId?: string;
};

export type GameCompactToServer = {
  id: string;
};

export type TurnToServer = {
  turn: number;

  game: GameCompactToServer;

  player: Player;

  newObjects: TurnGameObjectsLists;
  removedObjects: TurnRemovedGameObjects;
  updatedObjects: TurnGameObjectsLists;
};

export type TurnFromServer = {
  turn: number;

  game: GameCompactFromServer;

  players: [Player, Player];

  newObjects: TurnGameObjectsLists;
  removedObjects: TurnRemovedGameObjects;
  updatedObjects: TurnGameObjectsLists;
};
