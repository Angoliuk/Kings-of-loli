import { IoEvent } from '@kol/shared-game/interfaces';
import { CommandWarningReact, LeaveWindowReact } from '@web/components/hud/modals-windows/modals-windows';
import { useGameStore } from '@web/modules/match/match-store/game-store';
import { AppRoutes } from '@web/routes/app-router-enum';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { connectToSocket } from '@web/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useModalContext } from './use-modal';
export const useSocketEvents = () => {
  const { user, update } = useAuthStore();
  const [setGame, parseTurn] = useGameStore((state) => [state.setGame, state.parseTurn]);
  const { openModal } = useModalContext();

  useEffect(() => {
    if (!user) return;
    connectToSocket(user.id);
  }, [user]);

  useEffect(() => {
    if (!window.socketIO) return;

    window.socketIO.on(IoEvent.CONNECT, () => console.log('connect'));
    window.socketIO.on(IoEvent.GAME_FOUND, (game) => {
      setGame(game);
      openModal(<CommandWarningReact team={game.players.find((player) => player.userId === user?.id)?.team} />),
        // TODO: gameLoaded needs to call on all sprites load
        window.socketIO?.emit(IoEvent.GAME_LOADED);
    });
    window.socketIO.on(IoEvent.USER_UPDATE, (data) => {
      update(data);
    });
    window.socketIO.on(IoEvent.TURN_FROM_SERVER, (turnFromServer) => {
      parseTurn(turnFromServer);
      turnFromServer.game.isFinished && openModal(<LeaveWindowReact />);
    });
    window.socketIO.on(IoEvent.DISCONNECT, () => console.log('disconnect'));

    return () => {
      if (!window.socketIO) return;
      window.socketIO.removeAllListeners(IoEvent.CONNECT);
      window.socketIO.removeAllListeners(IoEvent.GAME_FOUND);
      window.socketIO.removeAllListeners(IoEvent.TURN_FROM_SERVER);
      window.socketIO.removeAllListeners(IoEvent.DISCONNECT);
      window.socketIO.removeAllListeners(IoEvent.USER_UPDATE);
    };
  }, [window.socketIO]);
};
