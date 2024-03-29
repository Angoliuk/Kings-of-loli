import { GameWithObjects, type Game, type TurnFromServer, type TurnToServer } from './game';
export enum IoEvent {
  TURN_TO_SERVER = 'turn-to-server',
  TURN_FROM_SERVER = 'turn-from-server',
  SEARCH_GAME = 'search-game',
  CANCEL_SEARCH_GAME = 'cancel-search-game',
  GAME_FOUND = 'game-found',
  GAME_LOADED = 'game-loaded',
  USER_UPDATE = 'user-update',
  USER_DELETE = 'user-delete',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
}

export type IoClientToServerEvents = {
  [IoEvent.TURN_TO_SERVER]: (data: TurnToServer) => void;
  [IoEvent.SEARCH_GAME]: () => void;
  [IoEvent.CANCEL_SEARCH_GAME]: () => void;
  [IoEvent.GAME_LOADED]: () => void;
};

export type IoServerToClientEvents = {
  [IoEvent.TURN_FROM_SERVER]: (data: TurnFromServer) => void;
  [IoEvent.GAME_FOUND]: (data: GameWithObjects) => void;
  [IoEvent.USER_UPDATE]: (data: Partial<{ name: string; sound: number }>) => void;
  [IoEvent.USER_DELETE]: (data: { deletedUserId: string }) => void;
};

export type IoData = {
  userId: string;
};
