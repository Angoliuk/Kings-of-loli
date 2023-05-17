import { useEffect, useState } from 'react';

import { HP_ROW_LIMIT } from '../constants';

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
      width: map.desiredSize.width / 13,
      height: map.desiredSize.height / 6,
    },
  );

  const hpBar = new SpriteSizes(
    { width: 50, height: 15 },
    { height: 10, width: mapTile.desiredSize.width / HP_ROW_LIMIT - 8 },
  );

  return {
    bottomPanel,
    cardSize,
    sidePanelLeft,
    sidePanelRight,
    topPanel,
    windowSize,
    mapTile,
    hpBar,
    map,
  };
};
