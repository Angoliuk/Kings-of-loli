/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { type GameObjectsList, Team, type TurnToServer } from '@kol/shared-game/interfaces';
import { sendTurn } from '@web/utils';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { useGameStore } from './game-store';
import { bindObject } from './temporary';

export const useTurnStore = create(
  combine(
    {
      game: { id: '666', turnsCount: 1 },
      player: { coins: 1, energy: 0, team: Team.BLUE, userId: 'lox' },
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
          if (!player) return;
          const updatedPlayer = {
            ...player,
            coins: player.coins + (coins ?? 0),
            energy: player.energy + (energy ?? 0),
          };
          //// here error with energy
          set({
            player: updatedPlayer,
          });
          useGameStore.getState().setPlayer(updatedPlayer);
        },
        addRemovedObject: <T extends GameObjectsList[keyof GameObjectsList]['instance']>(removedObject: T) => {
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
        addNewObject: <T extends GameObjectsList[keyof GameObjectsList]['instance']>(newObject: T) => {
          set({
            newObjects: {
              ...get().newObjects,
              [newObject.objectType]: [...get().newObjects[newObject.objectType], newObject],
            },
          });
          useGameStore.getState().addGameObject(newObject);
        },
        addUpdatedObject: <T extends GameObjectsList[keyof GameObjectsList]['instance']>(updatedObject: T) => {
          const previousUpdatedObjects = get().updatedObjects[updatedObject.objectType];
          let isUpdatedObjectDuplicate = false;
          console.log(get().updatedObjects, updatedObject.object, 'previousUpdatedObjects use turn store');
          console.log(isUpdatedObjectDuplicate, 'isUpdatedObjectDuplicate use turn store');
          // TODO: update recently added unit
          previousUpdatedObjects.map((previousUpdatedObject) => {
            console.log(previousUpdatedObject, 'previousUpdatedObject use turn store');
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
        createNewTurnTemplate() {
          set({
            game: { id: useGameStore.getState().id, turnsCount: useGameStore.getState().turnsCount + 1 },
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
        makeTurn() {
          sendTurn(get());
          console.log(get(), 'pizdec');
          set({
            game: { id: useGameStore.getState().id, turnsCount: useGameStore.getState().turnsCount + 1 },
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
);
