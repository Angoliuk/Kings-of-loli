import { Sprite } from '@pixi/react';

export const HudHealthBar = ({ hp = 6, maxHp = 6 }: { hp?: number; maxHp?: number }) => {
  if (hp > maxHp) hp = maxHp;
  if (hp <= 0) hp = 0;
  const height = -60;
  const hpHeight = (hp / maxHp) * height;

  const hpHeightTop = 155 + ((500 - 150) * (maxHp - hp)) / maxHp;
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
