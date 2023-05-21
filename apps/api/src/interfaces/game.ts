export type Card = { id: string };
export type Building = { id: string };
export type Unit = { id: string };

export enum GameObjectTypes {
  CARD = 'cards',
  UNIT = 'units',
  BUILDING = 'buildings',
}

export type Player = {
  coins: number;
  energy: number;
  userId: string;
  team: string;
};

export type GameObjects = {
  [GameObjectTypes.CARD]: Card[];
  [GameObjectTypes.BUILDING]: Building[];
  [GameObjectTypes.UNIT]: Unit[];
};

export type RemovedGameObjects = {
  [GameObjectTypes.CARD]: string[];
  [GameObjectTypes.BUILDING]: string[];
  [GameObjectTypes.UNIT]: string[];
};

export type Game = {
  id: string;
  players: [Player, Player];
  gameObjects: GameObjects;
  isFinished: boolean;
  winnedUserId: string;
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
