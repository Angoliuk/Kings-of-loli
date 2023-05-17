import { Sprite } from '@pixi/react';

export const HudHealthBar = ({ hp }: { hp: number }) => {
  const maxHp = 100;
  const height = -58;
  const hpHeight = (hp / maxHp) * height;
  const heightTop = 81;
  const hpHeightTop = hpHeight + heightTop;
  return (
    <>
      <Sprite
        y={hpHeightTop}
        anchor={[0, 0]}
        image={`resources/img/map/hud/health-top.png`}
        scale={{ x: 1, y: 1 }}
      />
      <Sprite
        y={85}
        anchor={[0, 0]}
        image={`resources/img/map/hud/health.png`}
        scale={{ x: 1, y: hpHeight }}
      />
    </>
  );
};
