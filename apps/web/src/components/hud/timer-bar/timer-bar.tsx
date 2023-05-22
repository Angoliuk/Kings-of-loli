import { Sprite, Text } from '@pixi/react';
import { SpriteSizes } from '@web/modules/match/utils/sprite-sizes';
import { TextStyle } from 'pixi.js';

const timerBar = new SpriteSizes({
  width: 313,
  height: 86,
});
export const TimerBar = ({ time }: { time: string }) => {
  return (
    <Sprite anchor={[-4, 0]} scale={timerBar.scale} {...timerBar} image={`resources/img/map/hud/timer-bg-hd.png`}>
      <Text
        text={time}
        y={0}
        anchor={[-7.6, 0]}
        style={new TextStyle({ fontSize: 69, fill: 'black' })}
        resolution={1.5}
      />
    </Sprite>
  );
};
