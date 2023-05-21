import { type Card, type Unit } from '@web/modules/match/match-map';
import { io, type Socket } from 'socket.io-client';

export enum GameObjectTypes {
  CARD = 'cards',
  UNIT = 'units',
  BUILDING = 'buildings',
}
export type Building = { id: string; c: string };

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

export enum IoEvent {
  TURN_TO_SERVER = 'turn-to-server',
  TURN_FROM_SERVER = 'turn-from-server',
  SEARCH_GAME = 'search-game',
  GAME_FOUND = 'game-found',
  GAME_LOADED = 'game-loaded',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
}

export type IoClientToServerEvents = {
  [IoEvent.TURN_TO_SERVER]: (data: TurnToServer) => void;
  [IoEvent.SEARCH_GAME]: () => void;
  [IoEvent.GAME_LOADED]: () => void;
};

export type IoServerToClientEvents = {
  [IoEvent.TURN_FROM_SERVER]: (data: TurnFromServer) => void;
  [IoEvent.GAME_FOUND]: (data: Game) => void;
};

declare global {
  interface Window {
    socketIO?: Socket<IoServerToClientEvents, IoClientToServerEvents>;
  }
}
export const connectToSocket = (userId: string) =>
  (window.socketIO = io(import.meta.env.VITE_SOCKET_URL, {
    multiplex: false,
    transports: ['websocket'],
    query: { userId },
  }));
