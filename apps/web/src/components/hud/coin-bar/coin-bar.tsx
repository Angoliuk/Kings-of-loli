import { Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

import { useSizes } from '../../../modules/match/utils/sprite-sizes';

export const CoinBar = ({ coins }: { coins: number }) => {
  const { coinBar, coin } = useSizes();
  if (coins > 99) coins = 99;
  return (
    <>
      <Sprite
        x={coinBar.desiredSize.width * 0.5}
        {...coinBar.desiredSize}
        scale={coinBar.scale}
        image={`resources/img/map/hud/money-bg-hd.png`}
      >
        <Text
          text={coins.toString()}
          x={coins > 9 ? 25 : 55}
          y={3}
          style={new TextStyle({ fontSize: 69, fill: 'black' })}
          resolution={1.5}
        />
        <Sprite
          y={(coinBar.originalSize.height - coin.originalSize.height) / 2}
          x={coinBar.originalSize.width - coin.originalSize.width - 30}
          {...coin.desiredSize}
          scale={coin.scale}
          image={`resources/img/map/hud/coin-hd.png`}
        />
      </Sprite>
    </>
  );
};
