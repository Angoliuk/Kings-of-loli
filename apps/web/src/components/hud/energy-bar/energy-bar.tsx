import { Sprite } from '@pixi/react';
import { useSizes } from '@web/modules/match/utils/sprite-sizes';

export const EnergyBar = ({ energy }: { energy: number }) => {
  const { energySize, energyBar, topPanel } = useSizes();
  if (energy > 13) energy = 12;
  const a = (energyBar.desiredSize.width - energySize.desiredSize.width * 12) / 13 / 2;
  const gap = a + a / 12;
  return (
    <>
      <Sprite
        x={topPanel.desiredSize.width / 3.5}
        image={`resources/img/map/hud/energy-bar-hd.png`}
        {...energyBar.desiredSize}
        scale={energyBar.scale}
      />
      {Array.from({ length: energy }).map((_, index) => (
        <Sprite
          key={index}
          image={'resources/img/map/hud/energy-hd.png'}
          x={
            energyBar.desiredSize.width -
            energySize.desiredSize.width * 1.5 +
            (energySize.desiredSize.width + gap) * index
          }
          y={35}
          {...energySize.desiredSize}
          scale={energySize.scale}
        />
      ))}
    </>
  );
};
