import { type Game, type TurnFromServer } from '@kol/shared-game/interfaces';
import { updateGameObjectsGroup } from '@kol/shared-game/utils';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { bindObject } from './temporary';

export const useGameStore = create(
  immer(
    combine({} as Game, (set, get) =>
      bindObject({
        setGame: (game: Game) => {
          set(game);
        },
        parseTurn: (turn: TurnFromServer) => {
          set({
            ...get(),
            turnsCount: turn.game.turnsCount,
            gameObjects: {
              building: updateGameObjectsGroup(get().gameObjects.building, turn),
              card: updateGameObjectsGroup(get().gameObjects.card, turn),
              unit: updateGameObjectsGroup(get().gameObjects.unit, turn),
            },
            id: turn.game.id,
            isFinished: turn.game.isFinished,
            players: turn.players,
            turns: [...get().turns, turn],
            winnedUserId: turn.game.winnedUserId,
          } as Game);
        },
        getCurrentPlayer: () => {
          return get().players.find((player) => player.userId === useAuthStore.getState().user?.id);
        },
      }),
    ),
  ),
);
