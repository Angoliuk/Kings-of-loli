import { GameObjects } from '@kol/shared-game/game-objects';
import {
  type GameObjectsList,
  type GameWithObjects,
  type Player,
  type TurnFromServer,
} from '@kol/shared-game/interfaces';
import { createEmptyGame, updateGameObjectsGroup } from '@kol/shared-game/utils';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { plainToInstance } from 'class-transformer';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { bindObject } from './temporary';

export const useGameStore = create(
  combine(createEmptyGame(), (set, get) =>
    bindObject({
      setGame: (game: GameWithObjects) => {
        set({
          ...game,
          gameObjects: {
            building: plainToInstance(GameObjects.Building, game.gameObjects.building),
            card: game.gameObjects.card.map((card) => plainToInstance(GameObjects.Card, card)),
            unit: plainToInstance(GameObjects.Unit, game.gameObjects.unit),
          },
        });
      },
      parseTurn: (turn: TurnFromServer) => {
        turn.newObjects.building = plainToInstance(GameObjects.Building, turn.newObjects.building);
        turn.newObjects.card = plainToInstance(GameObjects.Card, turn.newObjects.card);
        turn.newObjects.unit = plainToInstance(GameObjects.Unit, turn.newObjects.unit);
        turn.updatedObjects.building = plainToInstance(GameObjects.Building, turn.updatedObjects.building);
        turn.updatedObjects.card = plainToInstance(GameObjects.Card, turn.updatedObjects.card);
        turn.updatedObjects.unit = plainToInstance(GameObjects.Unit, turn.updatedObjects.unit);

        set({
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
        });
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
      removeGameObject: (removedObject: GameObjectsList[keyof GameObjectsList]['instance']) => {
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
      addGameObject: (newObject: GameObjectsList[keyof GameObjectsList]['instance']) => {
        set({
          gameObjects: {
            ...get().gameObjects,
            [newObject.objectType]: [...get().gameObjects[newObject.objectType], newObject],
          },
        });
      },
      updateGameObject: (updatedObject: GameObjectsList[keyof GameObjectsList]['instance']) => {
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
);
