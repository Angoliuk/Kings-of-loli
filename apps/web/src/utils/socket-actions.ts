import { IoEvent, type TurnToServer } from '@kol/shared-game/interfaces';
import { Loader } from '@web/components/loader/loader';
let findedGame = false;
const sendTurn = (turn: TurnToServer) => {
  window.socketIO?.emit(IoEvent.TURN_TO_SERVER, turn);
};

const startSearch = () => {
  window.socketIO?.emit(IoEvent.SEARCH_GAME);
  findedGame = false;
  findedGame ?? Loader();
};

const gameLoaded = () => {
  findedGame = true;
  window.socketIO?.emit(IoEvent.GAME_LOADED);
};
export { gameLoaded, sendTurn, startSearch };
