import { IoEvent } from '@kol/shared-game/interfaces';
import { useGameStore } from '@web/modules/match/match-store/game-store';
import { AppRoutes } from '@web/routes/app-router-enum';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { connectToSocket } from '@web/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const useSocketEvents = () => {
  let count = 0;

  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [setGame, parseTurn] = useGameStore((state) => [state.setGame, state.parseTurn]);

  useEffect(() => {
    if (!user) return;
    connectToSocket(user.id);
  }, [user]);

  useEffect(() => {
    if (!window.socketIO) return;

    window.socketIO.on(IoEvent.CONNECT, () => console.log('connect'));
    window.socketIO.on(IoEvent.GAME_FOUND, (game) => {
      setGame(game);
      navigate(`${AppRoutes.Battle}`);
      // TODO: gameLoaded needs to call on all sprites load
      window.socketIO?.emit(IoEvent.GAME_LOADED);
    });
    window.socketIO.on(IoEvent.TURN_FROM_SERVER, (turnFromServer) => {
      count += 1;
      console.log(count, 'count in useSocketEvents');
      parseTurn(turnFromServer);
    });
    window.socketIO.on(IoEvent.DISCONNECT, () => console.log('disconnect'));

    return () => {
      if (!window.socketIO) return;
      window.socketIO.removeAllListeners(IoEvent.CONNECT);
      window.socketIO.removeAllListeners(IoEvent.GAME_FOUND);
      window.socketIO.removeAllListeners(IoEvent.TURN_FROM_SERVER);
      window.socketIO.removeAllListeners(IoEvent.DISCONNECT);
    };
  }, [window.socketIO]);
};
