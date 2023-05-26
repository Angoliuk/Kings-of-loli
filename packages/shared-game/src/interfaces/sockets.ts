import { GameWithObjects, type Game, type TurnFromServer, type TurnToServer } from './game';

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
  [IoEvent.GAME_FOUND]: (data: GameWithObjects) => void;
};

export type IoData = {
  userId: string;
};
