import { useEffect, useState } from 'react';

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
  const mapTiles = new SpriteSizes(
    { width: 201, height: 201 },
    { width: (innerWidth - 100) / 13, height: (innerHeight - 290) / 6 },
  );

  const hpBar = new SpriteSizes({ width: 50, height: 15 }, { height: 10, width: 50 });

  return {
    bottomPanel,
    cardSize,
    sidePanelLeft,
    sidePanelRight,
    topPanel,
    windowSize,
    mapTiles,
    hpBar,
  };
};
