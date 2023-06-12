import { Sprite, Text } from '@pixi/react';
import { useSizes } from '@web/modules/match/utils/sprite-sizes';
import { TextStyle } from 'pixi.js';

export const TimerBar = ({ time }: { time: string }) => {
  const { timerBar } = useSizes();
  return (
    <Sprite
      anchor={[-4, 0]}
      scale={timerBar.scale}
      {...timerBar.desiredSize}
      image={`resources/img/map/hud/timer-bg-hd.png`}
    >
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
