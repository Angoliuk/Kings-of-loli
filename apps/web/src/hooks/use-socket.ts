import { IoEvent, type TurnToServer } from '@web/interfaces';
import { useTurn, useUser } from '@web/modules/match/match-hud';
import { AppRoutes } from '@web/routes/app-router-enum';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { connectToSocket } from '@web/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSocket = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const turn = (turn: TurnToServer) => {
    window.socketIO?.emit(IoEvent.TURN_TO_SERVER, turn);
  };

  const startSearch = () => {
    window.socketIO?.emit(IoEvent.SEARCH_GAME);
  };

  const gameLoaded = () => {
    window.socketIO?.emit(IoEvent.GAME_LOADED);
  };

  useEffect(() => {
    if (!user) return;
    connectToSocket(user.id);
  }, [user]);

  useEffect(() => {
    if (!window.socketIO) return;

    window.socketIO.on(IoEvent.CONNECT, () => console.log('connect'));
    window.socketIO.on(IoEvent.GAME_FOUND, () => {
      const turn = useTurn((state) => state.updateTurn); //передаємо сюди наш turn
      // turn(newTurn);
      gameLoaded();
      navigate(`${AppRoutes.Battle}`);
    }); //found game
    window.socketIO.on(IoEvent.TURN_FROM_SERVER, (turnFromServer) => {
      const addUnitInGame = useUser((state) => state.addUnit);
      const updateUnitInGame = useUser((state) => state.updatedUnit);
      const killUnitInGame = useUser((state) => state.killUnit);
      turnFromServer.newObjects;
      // const turn = useTurn((state) => state.updateTurn);
      // turn(newTurn);
    }); //turn form server  (оброблюємо turn ворога і робимо так щоб зміни які відбулися відмалювалися і в нас)

    window.socketIO.on(IoEvent.DISCONNECT, () => console.log('disconnect'));

    return () => {
      if (!window.socketIO) return;
      window.socketIO.off(IoEvent.CONNECT, () => console.log('connect'));
      window.socketIO.off(IoEvent.GAME_FOUND, () => console.log('connect'));
      window.socketIO.off(IoEvent.DISCONNECT, () => console.log('disconnect'));
    };
  }, [window.socketIO]);

  return { turn, startSearch, gameLoaded };
};
