import { GameObjectType, GameObjectsList } from './game-objects';

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

export type GameObjectsListsObjects = {
  [GameObjectType.CARD]: GameObjectsList['card']['object'][];
  [GameObjectType.BUILDING]: GameObjectsList['building']['object'][];
  [GameObjectType.UNIT]: GameObjectsList['unit']['object'][];
};

export type GameObjectsLists = {
  [GameObjectType.CARD]: GameObjectsList['card']['instance'][];
  [GameObjectType.BUILDING]: GameObjectsList['building']['instance'][];
  [GameObjectType.UNIT]: GameObjectsList['unit']['instance'][];
};

export type GameWithObjects = {
  id: string;
  players: [Player, Player];
  gameObjects: GameObjectsListsObjects;
  isFinished: boolean;
  winnedUserId?: string;
  turnsCount: number;
  turns: TurnFromServer[];
};

export type Game = {
  id: string;
  players: [Player, Player];
  gameObjects: GameObjectsLists;
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

export type TurnBase = {
  turn: number;

  newObjects: GameObjectsListsObjects;
  updatedObjects: GameObjectsListsObjects;
  removedObjects: {
    [GameObjectType.CARD]: string[];
    [GameObjectType.BUILDING]: string[];
    [GameObjectType.UNIT]: string[];
  };
};

export type TurnToServer = TurnBase & {
  player: Player;

  game: GameCompactToServer;
};

export type TurnFromServer = TurnBase & {
  players: [Player, Player];

  game: GameCompactFromServer;
};
