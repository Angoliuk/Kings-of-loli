import { useEffect, useState } from 'react';

import { GAME_FIELD, HP_ROW_LIMIT, hpBarContainerPadding, hpBarPadding } from '../constants';

type SpriteSizesProperties = {
  originalSize: { width: number; height: number };
  desiredSize: { width: number; height: number };
  scale: { x: number; y: number };
};
export class SpriteSizes implements SpriteSizesProperties {
  #originalSize: { width: number; height: number };
  #desiredSize: { width: number; height: number };
  #scale: { x: number; y: number };
  constructor(
    originalSize: { width: number; height: number },
    desiredSize?: { width: number; height: number },
  ) {
    this.#originalSize = originalSize;
    this.#desiredSize = desiredSize ?? originalSize;
    this.#scale = {
      x: this.#desiredSize.width / this.#originalSize.width,
      y: this.#desiredSize.height / this.#originalSize.height,
    };
  }
  get originalSize() {
    return this.#originalSize;
  }
  get desiredSize() {
    return this.#desiredSize;
  }
  get scale() {
    return this.#scale;
  }
}

export const useSizes = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardSize = new SpriteSizes({ width: 320, height: 490 });
  const bottomPanel = new SpriteSizes(
    { width: 268, height: 46 },
    { width: windowSize.width, height: windowSize.height / 3.5 },
  );

  const topPanel = new SpriteSizes(
    { width: 268, height: 20 },
    { width: windowSize.width, height: windowSize.height / 8 },
  );
  const sidePanelRight = new SpriteSizes(
    { width: 7, height: 95 },
    { width: windowSize.width / 33, height: windowSize.height / 1.45 },
  );
  const sidePanelLeft = new SpriteSizes(
    { width: 7, height: 95 },
    { width: -windowSize.width / 33, height: windowSize.height / 1.45 },
  );

  const map = new SpriteSizes({
    width:
      innerWidth - (Math.abs(sidePanelLeft.desiredSize.width) + sidePanelRight.desiredSize.width),
    height: innerHeight - (topPanel.desiredSize.height + bottomPanel.desiredSize.height) + 100,
  });

  const mapTile = new SpriteSizes(
    { width: 201, height: 201 },
    {
      width: map.desiredSize.width / GAME_FIELD.x,
      height: map.desiredSize.height / GAME_FIELD.y,
    },
  );

  const hpBarContainer = new SpriteSizes({
    width: mapTile.desiredSize.width - hpBarContainerPadding,
    height: 40,
  });

  const hpBar = new SpriteSizes(
    { width: 50, height: 15 },
    {
      height: 8,
      width: hpBarContainer.desiredSize.width / HP_ROW_LIMIT - hpBarPadding,
    },
  );

  const unit = new SpriteSizes(
    { width: 140, height: 130 },
    { height: 0.6 * mapTile.desiredSize.height, width: 0.6 * mapTile.desiredSize.width },
  );

  const unitAction = new SpriteSizes(
    { width: 160, height: 160 },
    { height: 0.75 * mapTile.desiredSize.height, width: 0.75 * mapTile.desiredSize.width },
  );

  return {
    hpBarContainer,
    unitAction,
    bottomPanel,
    cardSize,
    sidePanelLeft,
    sidePanelRight,
    topPanel,
    windowSize,
    mapTile,
    hpBar,
    map,
    unit,
  };
};
