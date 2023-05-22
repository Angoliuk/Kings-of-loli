import { type CardObject } from '@kol/shared-game/game-objects';
import { type FederatedEvent } from 'pixi.js';
import { type FC, memo } from 'react';

import { useSizes } from '../utils/sprite-sizes';
import { CardItem } from './card';

export type CardsProperties = {
  cards: CardObject.Card[];
  selectedCard: CardObject.Card | null;
  onClick: (card: CardObject.Card) => void;
};
export const Cards: FC<CardsProperties> = memo(({ cards, selectedCard, onClick }) => {
  const { card: cardSize } = useSizes();

  const handleHover = (card: CardObject.Card, event: FederatedEvent) => {
    // @ts-expect-error wrong type
    if (selectedCard?.id !== card.id) event.target.y = -0.1 * cardSize.desiredSize.height;
  };

  const handleHoverOut = (card: CardObject.Card, event: FederatedEvent) => {
    // @ts-expect-error wrong type
    if (selectedCard?.id !== card.id) event.target.y = 0.25 * cardSize.desiredSize.height;
  };

  return (
    <>
      {cards.map((card, index) => (
        <CardItem
          key={card.id}
          cardIndex={index}
          cardsLength={cards.length}
          card={card}
          y={selectedCard?.id === card.id ? -0.1 * cardSize.desiredSize.height : 0.25 * cardSize.desiredSize.height}
          onClick={onClick}
          onHover={handleHover}
          onHoverOut={handleHoverOut}
        />
      ))}
    </>
  );
});
