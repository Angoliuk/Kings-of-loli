import { memo } from 'react';

import { GAME_FIELD } from '../constants';
import { Tile } from './tile';

export type GameFieldTile = {
  x: number;
  y: number;
  source: string;
};

const gameField = Array.from<never, GameFieldTile[]>({ length: GAME_FIELD.y }, (_, yIndex) =>
  Array.from<never, GameFieldTile>({ length: GAME_FIELD.x }, (_, xIndex) => ({
    x: xIndex,
    y: yIndex,
    source: `resources/img/map/tiles/${yIndex}/${xIndex + 1}.gif`,
  })),
);
export const GameField = memo(() => {
  return <>{gameField.map((row) => row.map((tile) => <Tile key={`sprite-${tile.y}-${tile.x}`} {...tile} />))}</>;
});
