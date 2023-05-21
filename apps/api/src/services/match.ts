import { randomUUID } from 'node:crypto';

import { type Game, Teams } from '../interfaces';

export const createBaseGame = (players: [string, string]): Game => {
  return {
    id: randomUUID(),
    isFinished: false,
    turns: [],
    turnsCount: 0,
    winnedUserId: undefined,
    gameObjects: {
      cards: [],
      units: [],
      buildings: [],
    },
    players: [
      {
        coins: 7,
        energy: 8,
        team: Teams.BLUE,
        userId: players[0],
      },
      {
        coins: 7,
        energy: 8,
        team: Teams.GREEN,
        userId: players[1],
      },
    ],
  };
};
