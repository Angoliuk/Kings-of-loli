import { IoEvent, type TurnToServer } from '@web/interfaces';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { connectToSocket } from '@web/utils';
import { useEffect } from 'react';

export const useSocket = () => {
  const { user } = useAuthStore();

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
    window.socketIO.on(IoEvent.GAME_FOUND, () => console.log('found game'));
    window.socketIO.on(IoEvent.TURN_FROM_SERVER, () => console.log('turn'));

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
