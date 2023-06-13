import { Sprite, Text } from '@pixi/react';
import { useCountDown } from '@web/hooks/use-count-down';
import { useGameStore } from '@web/modules/match/match-store/game-store';
import { useTurnStore } from '@web/modules/match/match-store/turn-store';
import { useSizes } from '@web/modules/match/utils/sprite-sizes';
import { getTimeFormat } from '@web/utils';
import { TextStyle } from 'pixi.js';
import { type FC, useEffect } from 'react';

export const TimerBar: FC = () => {
  const { timerBar, topPanel } = useSizes();
  const makeTurn = useTurnStore((state) => state.makeTurn);
  const { countDown, stopCountDown, setCountDownTime, startCountDown } = useCountDown(makeTurn);
  const [turnsCount, players, getCurrentPlayer] = useGameStore((store) => [
    store.turnsCount,
    store.players,
    store.getCurrentPlayer,
  ]);

  useEffect(() => {
    if (players[Number(turnsCount % 2 === 0)].userId === getCurrentPlayer()?.userId) {
      stopCountDown();
      setCountDownTime(60);
    } else {
      startCountDown(60);
    }
  }, [turnsCount]);

  return (
    <Sprite
      x={topPanel.desiredSize.width - timerBar.desiredSize.width * 1.2}
      scale={timerBar.scale}
      {...timerBar.desiredSize}
      image={`resources/img/map/hud/timer-bg-hd.png`}
    >
      <Text
        x={timerBar.desiredSize.width / 4.2}
        text={getTimeFormat(countDown)}
        style={new TextStyle({ fontSize: 69, fill: 'black' })}
      />
    </Sprite>
  );
};
