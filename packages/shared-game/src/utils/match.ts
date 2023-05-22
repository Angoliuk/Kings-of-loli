import { type Game, Team } from '../interfaces';

export const createBaseGame = (players: [string, string]): Game => {
  return {
    id: '12',
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
        team: Team.BLUE,
        userId: players[0],
      },
      {
        coins: 7,
        energy: 8,
        team: Team.GREEN,
        userId: players[1],
      },
    ],
  };
};
