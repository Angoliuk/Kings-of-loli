import { GameObjects } from '@kol/shared-game/game-objects';
import {
  type GameObjectsList,
  type GameWithObjects,
  type Player,
  type TurnFromServer,
} from '@kol/shared-game/interfaces';
import { createEmptyGame, updateGameObjectsGroup } from '@kol/shared-game/utils';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import {} from 'class-transformer';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { bindObject } from './temporary';
import { useTurnStore } from './turn-store';
export const useGameStore = create(
  combine(createEmptyGame(), (set, get) =>
    bindObject({
      setGame: (game: GameWithObjects) => {
        set({
          ...game,
          gameObjects: {
            building: game.gameObjects.building.map((building) => new GameObjects.Building(building)),
            unit: game.gameObjects.unit.map((unit) => new GameObjects.Unit(unit)),
            card: game.gameObjects.card.map((card) => new GameObjects.Card(card)),
          },
        });

        useTurnStore.getState().createNewTurnTemplate();
      },

      parseTurn: (turn: TurnFromServer) => {
        // console.log((count2 += 1), 'count2??????????//'), ///причина в тому що функція визивається більше 1 разу (6)
        //тут шукати проблему
        turn.newObjects.building = turn.newObjects.building.map((building) => new GameObjects.Building(building));
        // turn.newObjects.card = turn.newObjects.card.map((card) => new GameObjects.Card(card));
        turn.newObjects.unit = turn.newObjects.unit.map(
          (unit) =>
            // new GameObjects.Unit(unit), console.log(turn.newObjects.unit.length, (count += 1), '??????????//') ///причина в тому що функція визивається більше 1 разу (6)
            new GameObjects.Unit(unit),
        );
        turn.updatedObjects.building = turn.updatedObjects.building.map(
          (building) => new GameObjects.Building(building),
        );
        turn.updatedObjects.card = turn.updatedObjects.card.map((card) => new GameObjects.Card(card));
        turn.updatedObjects.unit = turn.updatedObjects.unit.map((unit) => new GameObjects.Unit(unit));

        console.log(turn, 'turn in parseTurn');
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
              (gameObject: typeof removedObject) => gameObject.id !== removedObject.id,
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
