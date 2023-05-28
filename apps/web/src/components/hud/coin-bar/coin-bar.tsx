import { Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

import { useSizes } from '../../../modules/match/utils/sprite-sizes';

export const CoinBar = ({ coins }: { coins: number }) => {
  const { coinBar, topPanel, coin } = useSizes();
  return (
    <>
      <Sprite
        x={topPanel.desiredSize.width / 8}
        {...coinBar.desiredSize}
        scale={coinBar.scale}
        image={`resources/img/map/hud/money-bg-hd.png`}
      >
        <Sprite
          x={coinBar.desiredSize.width - coin.desiredSize.width - 10}
          y={coinBar.desiredSize.height * 0.15}
          {...coin.desiredSize}
          scale={coin.scale}
          image={`resources/img/map/hud/coin-hd.png`}
        />

        <Text text={coins.toString()} x={30} style={new TextStyle({ fontSize: 69, fill: 'black' })} resolution={1.5} />
      </Sprite>
    </>
  );
};
