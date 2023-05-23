import { GAME_FIELD } from '@kol/shared-game/constants';
import { type Coordinates } from '@kol/shared-game/interfaces';
import { memo } from 'react';

import { Tile } from './tile';

export type GameFieldTile = {
  source: string;
} & Coordinates;

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
