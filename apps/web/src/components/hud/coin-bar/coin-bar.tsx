import { Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

import { SpriteSizes, useSizes } from '../../../modules/match/utils/sprite-sizes';

const coin = new SpriteSizes({
  width: 48,
  height: 55,
});

export const CoinBar = ({ coins = 10 }: { coins: number }) => {
  const { coinBar } = useSizes();
  return (
    <>
      <Sprite {...coinBar} anchor={[-2, 0]} image={`resources/img/map/hud/money-bg-hd.png`}>
        <Sprite {...coin} anchor={[-10.5, -0.2]} image={`resources/img/map/hud/coin-hd.png`} />

        <Text
          text={coins.toString()}
          y={0}
          x={410}
          style={new TextStyle({ fontSize: 69, fill: 'black' })}
          resolution={1.5}
        />
      </Sprite>
    </>
  );
};
