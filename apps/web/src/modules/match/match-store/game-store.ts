import { BuildingObject, CardObject, UnitObject } from '@kol/shared-game/game-objects';
import { type Game, type Player, type TurnFromServer, type TurnGameObjects } from '@kol/shared-game/interfaces';
import { createEmptyGame, updateGameObjectsGroup } from '@kol/shared-game/utils';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { bindObject } from './temporary';

export const useGameStore = create(
  combine(createEmptyGame(), (set, get) =>
    bindObject({
      setGame: (game: Game) => {
        game.gameObjects.building.map((building) => new BuildingObject.Building(building));
        game.gameObjects.card.map((card) => new CardObject.Card(card));
        game.gameObjects.unit.map((unit) => new UnitObject.Unit(unit));
        set(game);
      },
      parseTurn: (turn: TurnFromServer) => {
        turn.newObjects.building.map((building) => new BuildingObject.Building(building));
        turn.newObjects.card.map((card) => new CardObject.Card(card));
        turn.newObjects.unit.map((unit) => new UnitObject.Unit(unit));
        turn.updatedObjects.building.map((building) => new BuildingObject.Building(building));
        turn.updatedObjects.card.map((card) => new CardObject.Card(card));
        turn.updatedObjects.unit.map((unit) => new UnitObject.Unit(unit));

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
      removeGameObject: (removedObject: TurnGameObjects[keyof TurnGameObjects]) => {
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
      addGameObject: (newObject: TurnGameObjects[keyof TurnGameObjects]) => {
        set({
          gameObjects: {
            ...get().gameObjects,
            [newObject.objectType]: [...get().gameObjects[newObject.objectType], newObject],
          },
        });
      },
      updateGameObject: (updatedObject: TurnGameObjects[keyof TurnGameObjects]) => {
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
