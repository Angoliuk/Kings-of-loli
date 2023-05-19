import { Sprite } from '@pixi/react';

export const HudHealthBar = ({ hp }: { hp: number }) => {
  const maxHp = 100;
  const height = -60;
  const hpHeight = (hp / maxHp) * height;
  const heightTop = 210;
  const hpHeightTop = hpHeight + heightTop;
  return (
    <>
      <Sprite
        y={hpHeightTop}
        anchor={[0, 0]}
        image={`resources/img/map/hud/health-top-hd.png`}
        scale={{ x: 1.2, y: 1 }}
      />
      <Sprite y={530} anchor={[0, 0]} image={`resources/img/map/hud/health-hd.png`} scale={{ x: 1.2, y: hpHeight }} />
    </>
  );
};
