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

export type GameObjects = {
  [GameObjectType.CARD]: Card[];
  [GameObjectType.BUILDING]: Building[];
  [GameObjectType.UNIT]: Unit[];
};

export type RemovedGameObjects = {
  [GameObjectType.CARD]: string[];
  [GameObjectType.BUILDING]: string[];
  [GameObjectType.UNIT]: string[];
};

export type Game = {
  id: string;
  players: [Player, Player];
  gameObjects: GameObjects;
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

  newObjects: GameObjects;
  removedObjects: RemovedGameObjects;
  updatedObjects: GameObjects;
};

export type TurnFromServer = {
  turn: number;

  game: GameCompactFromServer;

  player: Player;

  newObjects: GameObjects;
  removedObjects: RemovedGameObjects;
  updatedObjects: GameObjects;
};
