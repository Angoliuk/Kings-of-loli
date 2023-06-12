import { Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

import { useSizes } from '../../../modules/match/utils/sprite-sizes';

export const CoinBar = ({ coins }: { coins: number }) => {
  const { coinBar, topPanel, coin } = useSizes();
  if (coins > 99) coins = 99;
  return (
    <>
      <Sprite
        x={topPanel.desiredSize.width / 8}
        {...coinBar.desiredSize}
        scale={coinBar.scale}
        image={`resources/img/map/hud/money-bg-hd.png`}
      >
        <Sprite
          x={coins > 9 ? coinBar.desiredSize.width / 2 + coin.desiredSize.width / 2 : coin.desiredSize.width}
          y={coinBar.desiredSize.height * 0.15}
          {...coin.desiredSize}
          scale={coin.scale}
          image={`resources/img/map/hud/coin-hd.png`}
        />

        <Text
          text={coins.toString()}
          x={coins > 9 ? 30 : 50}
          style={new TextStyle({ fontSize: 69, fill: 'black' })}
          resolution={1.5}
        />
      </Sprite>
    </>
  );
};
