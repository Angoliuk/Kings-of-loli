import { type Game, type GameObjects, type Player, type TurnFromServer } from '@kol/shared-game/interfaces';
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
        setPlayer: (updatedPlayer: Player) => {
          return set({
            players: get().players.map((player) =>
              player.userId === useAuthStore.getState().user?.id ? updatedPlayer : player,
            ) as [Player, Player],
          });
        },
        removeGameObject: (removedObject: GameObjects[keyof GameObjects]) => {
          set({
            gameObjects: {
              ...get().gameObjects,
              // @ts-expect-error filter is stupid
              [removedObject.objectType]: get().gameObjects[removedObject.objectType].filter(
                (gameObject: typeof removedObject) => gameObject.id === removedObject.id,
              ) as (typeof removedObject)[],
            },
          });
        },
        addGameObject: (newObject: GameObjects[keyof GameObjects]) => {
          set({
            gameObjects: {
              ...get().gameObjects,
              [newObject.objectType]: [...get().gameObjects[newObject.objectType], newObject],
            },
          });
        },
        updateGameObject: (updatedObject: GameObjects[keyof GameObjects]) => {
          set({
            gameObjects: {
              ...get().gameObjects,
              [updatedObject.objectType]: get().gameObjects[updatedObject.objectType].map((gameObject) =>
                gameObject.id === updatedObject.id ? updatedObject : gameObject,
              ),
            },
          });
        },
      }),
    ),
  ),
);
