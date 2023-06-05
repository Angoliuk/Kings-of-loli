import { GAME_FIELD } from '../constants';
import { Action } from '../game-objects/actions';
import { BaseGameObject } from '../game-objects/base';
import { ActionType } from '../interfaces';
import { Coordinates } from '../interfaces/general';
import { isCrossingObstacleCoordinates } from './obstacle';

export const movePatterns = {
  star: ({ x, y }: Coordinates) => {
    const radius = 1;
    const moves = [];
    for (let indexY = -radius; indexY <= radius; indexY++) {
      for (let indexX = -radius; indexX <= radius; indexX++) {
        const xCoord = x + indexX;
        const yCoord = y + indexY;
        if (indexX === -radius && indexY === -radius) {
          moves.push({ coords: { x: xCoord - 1, y: yCoord - 1 } }, { coords: { x: xCoord - 1, y: yCoord + 3 } });
        } else if (indexX === radius && indexY === radius) {
          moves.push({ coords: { x: xCoord + 1, y: yCoord + 1 } }, { coords: { x: xCoord + 1, y: yCoord - 3 } });
        }
        moves.push({ coords: { x: xCoord, y: yCoord } });
      }
    }

    return moves;
  },
  halfField:<T extends BaseGameObject & ({ coords: Coordinates } | { coords: Coordinates[] })>(obstacles:T[],side:'left'|'right')=>{
    const possibleMoves: Action[] = [];
    const initialX = side==='left'?0:Math.ceil(GAME_FIELD.x / 2)
    const lengthX = side==='left'?Math.floor(GAME_FIELD.x / 2):GAME_FIELD.x
    for (let y = 0; y < GAME_FIELD.y; y++) {
      for (let x = initialX; x < lengthX; x++) {
        const action = new Action({
          actionType: ActionType.MOVE,
          source: 'resources/img/map/tiles/point.png',
          coords: { x, y },
        });
        !obstacles.some((obstacle) => isCrossingObstacleCoordinates(action, obstacle)) && possibleMoves.push(action)
      }

  }
  return possibleMoves;
}
}
