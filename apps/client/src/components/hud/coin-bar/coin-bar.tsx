import { Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

export const CoinBar = ({ coins = 10 }: { coins: number }) => {
  return (
    <>
      <Sprite anchor={[-1.4, 0]} image={`resources/img/map/hud/money.png`}>
        <Text
          text={coins.toString()}
          y={-0.2}
          x={50}
          style={new TextStyle({ fontSize: 10, fill: 'black' })}
          resolution={1.5}
        />
      </Sprite>
    </>
  );
};
