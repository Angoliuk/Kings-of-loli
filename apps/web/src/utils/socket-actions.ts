import { IoEvent, type TurnToServer } from '@kol/shared-game/interfaces';
import { Loader } from '@web/components/loader/loader';

const sendTurn = (turn: TurnToServer) => {
  window.socketIO?.emit(IoEvent.TURN_TO_SERVER, turn);
};

const startSearch = () => {
  window.socketIO?.emit(IoEvent.SEARCH_GAME);
};

const stopSearch = () => {
  window.socketIO?.emit(IoEvent.CANCEL_SEARCH_GAME);
};

const gameLoaded = () => {
  window.socketIO?.emit(IoEvent.GAME_LOADED);
};
export { gameLoaded, sendTurn, startSearch, stopSearch };
