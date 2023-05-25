/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { type GameObjects, type TurnToServer } from '@kol/shared-game/interfaces';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useGameStore } from './game-store';
import { bindObject } from './temporary';

export const useTurnStore = create(
  immer(
    combine(
      {
        game: { id: useGameStore.getState().id },
        turn: useGameStore.getState().turnsCount + 1,
        player: useGameStore.getState().players.find((player) => player.userId === useAuthStore.getState().user?.id),
        updatedObjects: {
          building: [],
          card: [],
          unit: [],
        },
        removedObjects: {
          building: [],
          card: [],
          unit: [],
        },
        newObjects: {
          building: [],
          card: [],
          unit: [],
        },
      } as TurnToServer,
      (set, get) =>
        bindObject({
          updateCurrentPlayerResourcesBy: ({ coins, energy }: { coins?: number; energy?: number }) => {
            const player = get().player;
            set({
              player: { ...player, coins: player.coins + (coins ?? 0), energy: player.energy + (energy ?? 0) },
            });
            useGameStore.getState().setPlayer(get().player);
          },
          addRemovedObject: <T extends GameObjects[keyof GameObjects]>(removedObject: T) => {
            set({
              removedObjects: {
                ...get().removedObjects,
                [removedObject.objectType]: [...get().removedObjects[removedObject.objectType], removedObject.id],
              },
              updatedObjects: {
                ...get().updatedObjects,
                // @ts-expect-error filter is stupid
                [removedObject.objectType]: get().updatedObjects[removedObject.objectType].filter(
                  (updatedObject: T) => updatedObject.id !== removedObject.id,
                ) as T[],
              },
              newObjects: {
                ...get().newObjects,
                // @ts-expect-error filter is stupid
                [removedObject.objectType]: get().newObjects[removedObject.objectType].filter(
                  (newObject: T) => newObject.id !== removedObject.id,
                ) as T[],
              },
            });
            useGameStore.getState().removeGameObject(removedObject);
          },
          addNewObject: <T extends GameObjects[keyof GameObjects]>(newObject: T) => {
            set({
              newObjects: {
                ...get().newObjects,
                [newObject.objectType]: [...get().newObjects[newObject.objectType], newObject],
              },
            });
            useGameStore.getState().addGameObject(newObject);
          },
          addUpdatedObject: <T extends GameObjects[keyof GameObjects]>(updatedObject: T) => {
            const previousUpdatedObjects = get().updatedObjects[updatedObject.objectType];
            let isUpdatedObjectDuplicate = false;
            // TODO: update recently added unit
            previousUpdatedObjects.map((previousUpdatedObject) => {
              if (previousUpdatedObject.id === updatedObject.id) {
                isUpdatedObjectDuplicate = true;
                return updatedObject;
              } else {
                return previousUpdatedObject;
              }
            });
            set({
              updatedObjects: {
                ...get().updatedObjects,
                [updatedObject.objectType]: isUpdatedObjectDuplicate
                  ? previousUpdatedObjects
                  : [...previousUpdatedObjects, updatedObject],
              },
            });
            useGameStore.getState().updateGameObject(updatedObject);
          },
          createNewTurnTemplate: () => {
            set({
              game: { id: useGameStore.getState().id },
              turn: useGameStore.getState().turnsCount + 1,
              player: useGameStore.getState().getCurrentPlayer(),

              updatedObjects: {
                building: [],
                card: [],
                unit: [],
              },
              removedObjects: {
                building: [],
                card: [],
                unit: [],
              },
              newObjects: {
                building: [],
                card: [],
                unit: [],
              },
            });
          },
        }),
    ),
  ),
);
