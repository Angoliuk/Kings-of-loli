import { Coordinates } from '../interfaces/general';

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
};
