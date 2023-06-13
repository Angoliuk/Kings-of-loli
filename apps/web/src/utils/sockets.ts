import { type IoClientToServerEvents, type IoServerToClientEvents } from '@kol/shared-game/interfaces';
import { io, type Socket } from 'socket.io-client';

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
