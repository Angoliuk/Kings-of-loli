import { Sprite } from '@pixi/react';
import { type FederatedEvent } from 'pixi.js';
import { type FC, memo } from 'react';

import { type Card } from '../match-map';
import { useSizes } from '../utils/sprite-sizes';

export type CardItemProperties = {
  card: Card;
  cardsLength: number;
  cardIndex: number;
  y?: number;
  onClick: (card: Card, event: FederatedEvent) => void;
  onHover: (card: Card, event: FederatedEvent) => void;
  onHoverOut: (card: Card, event: FederatedEvent) => void;
};

export const CardItem: FC<CardItemProperties> = memo(
  ({ card, onClick, onHover, onHoverOut, cardsLength, cardIndex, y }) => {
    const { card: cardSize, bottomPanel } = useSizes();
    return (
      <Sprite
        key={card.id}
        scale={cardSize.scale}
        source={card.source}
        interactive={true}
        x={
          bottomPanel.desiredSize.width / (cardsLength <= 2 ? 2 : cardsLength) +
          cardSize.desiredSize.width * cardIndex -
          cardSize.desiredSize.width / 2
        }
        y={y ?? 0.25 * cardSize.desiredSize.height}
        {...cardSize.desiredSize}
        pointerout={(event: FederatedEvent) => onHoverOut(card, event)}
        pointerover={(event: FederatedEvent) => onHover(card, event)}
        click={(event: FederatedEvent) => onClick(card, event)}
      />
    );
  },
);
