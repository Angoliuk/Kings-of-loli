import { Sprite } from '@pixi/react';
import { useSizes } from '@web/modules/match/utils/sprite-sizes';

export const EnergyBar = ({ energy }: { energy: number }) => {
  const { energySize, energyBar } = useSizes();
  if (energy > 13) energy = 12;

  return (
    <>
      <Sprite anchor={[-0.87, 0]} image={`resources/img/map/hud/energy-bar-hd.png`} {...energyBar} />
      {Array.from({ length: energy }).map((_, index) => (
        <Sprite
          key={index}
          image={'resources/img/map/hud/energy-hd.png'}
          x={energyBar.desiredSize.width + energySize.desiredSize.width * index}
          y={39}
          {...energySize}
        />
      ))}
    </>
  );
};
