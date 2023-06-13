import { Sprite } from '@pixi/react';
import { HudHealthBar } from '@web/components/hud/health-bar/health-bar';
import { type FC, memo } from 'react';

import { useSizes } from '../utils/sprite-sizes';

export type SidePanelProperties = {
  side: 'Right' | 'Left';
  hp?: number;
  maxHp?: number;
};
export const SidePanel: FC<SidePanelProperties> = memo(({ side, hp, maxHp }) => {
  const { topPanel, windowSize, ...sizes } = useSizes();
  const sidePanel = sizes[`sidePanel${side}`];
  return (
    <Sprite
      y={topPanel.desiredSize.height / 1.9}
      x={side === 'Left' ? 0 : windowSize.width}
      image={`resources/img/map/hud/side-panel.png`}
      scale={sidePanel.scale}
      {...sidePanel.desiredSize}
    >
      <Sprite anchor={[0, -0.35]} image={`resources/img/map/hud/healthbar-empty-hd.png`}>
        {HudHealthBar({ hp: hp, maxHp: maxHp })}
        <Sprite anchor={[0, -0.35]} image={`resources/img/map/hud/healthbar-empty-flask-hd.png`} />
      </Sprite>
    </Sprite>
  );
});
