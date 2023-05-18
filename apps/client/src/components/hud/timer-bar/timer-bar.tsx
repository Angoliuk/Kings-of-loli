import { Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

import { SpriteSizes } from '../../../modules/match/utils/sprite-sizes';

const timerBar = new SpriteSizes({
  width: 313,
  height: 86,
});
export const TimerBar = ({ time }: { time: string }) => {
  return (
    <Sprite
      anchor={[-2.8, 0]}
      scale={timerBar.scale}
      {...timerBar}
      image={`resources/img/map/hud/timer-bg-hd.png`}
    >
      <Text
        text={time}
        y={0}
        x={950}
        style={new TextStyle({ fontSize: 69, fill: 'black' })}
        resolution={1.5}
      />
    </Sprite>
  );
};
