import { Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

export const TimerBar = ({ time }: { time: string }) => {
  return (
    <Sprite anchor={[-2.8, 0]} image={`resources/img/map/hud/timer.png`}>
      <Text
        text={time}
        y={-1.5}
        x={150}
        style={new TextStyle({ fontSize: 15, fill: 'black' })}
        resolution={1.5}
      />
    </Sprite>
  );
};
