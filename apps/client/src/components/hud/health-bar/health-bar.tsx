import { Sprite } from '@pixi/react';

export const HudHealthBar = ({ hp }: { hp: number }) => {
  const maxHp = 100;
  const height = -360;
  const hpHeight = (hp / maxHp) * height;
  const heightTop = 520;
  const hpHeightTop = hpHeight + heightTop;
  return (
    <>
      <Sprite
        y={hpHeightTop}
        anchor={[0, 0]}
        image={`resources/img/map/hud/health-top.png`}
        scale={{ x: 5, y: 3 }}
      />
      <Sprite
        y={530}
        anchor={[0, 0]}
        image={`resources/img/map/hud/health.png`}
        scale={{ x: 5, y: hpHeight }}
      />
    </>
  );
};
