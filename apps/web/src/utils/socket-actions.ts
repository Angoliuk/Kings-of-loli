import { IoEvent, type TurnToServer } from '@kol/shared-game/interfaces';

const sendTurn = (turn: TurnToServer) => {
  window.socketIO?.emit(IoEvent.TURN_TO_SERVER, turn);
};

const startSearch = () => {
  window.socketIO?.emit(IoEvent.SEARCH_GAME);
};

const gameLoaded = () => {
  window.socketIO?.emit(IoEvent.GAME_LOADED);
};
export { gameLoaded, sendTurn, startSearch };
