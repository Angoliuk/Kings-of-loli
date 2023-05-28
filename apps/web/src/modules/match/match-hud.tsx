import { type GameObjects } from '@kol/shared-game/game-objects';
import { Container, Sprite, Stage } from '@pixi/react';
import { CoinBar } from '@web/components/hud/coin-bar/coin-bar';
import { EnergyBar } from '@web/components/hud/energy-bar/energy-bar';
import { LeaveWindowPIXI } from '@web/components/hud/leave-window/leave-window';
import { TimerBar } from '@web/components/hud/timer-bar/timer-bar';
import { useModalContext } from '@web/hooks/use-modal';
import { useSocket } from '@web/hooks/use-socket';
import { type FC, type ReactNode, useCallback } from 'react';

import { Cards } from './cards/cards';
import { useGameStore } from './match-store/game-store';
import { useTurnStore } from './match-store/turn-store';
import { SidePanel } from './side-panel/side-panel';
import { useSizes } from './utils/sprite-sizes';

type BattleHudProperties = {
  children: ReactNode;
  setActions: React.Dispatch<React.SetStateAction<GameObjects.Action[]>>;
  selectedCard: GameObjects.Card | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<GameObjects.Card | null>>;
  setSelectedUnit: React.Dispatch<React.SetStateAction<GameObjects.Unit | null>>;
};

export const BattleHud: FC<BattleHudProperties> = ({
  children,
  setActions,
  selectedCard,
  setSelectedCard,
  setSelectedUnit,
}) => {
  const getTurn = useTurnStore((state) => state.getTurn);
  const { makeTurn } = useSocket();
  const [{ card: cards, building: buildings, unit: units }, getCurrentPlayer] = useGameStore((state) => [
    state.gameObjects,
    state.getCurrentPlayer,
  ]);
  const currentPlayer = getCurrentPlayer();
  const {
    bottomPanel,
    sidePanelLeft,
    topPanel,
    windowSize,
    map,
    homeButton,
    surrenderButton,
    moveButton,
    topPanelHeightWithoutCorner,
    bottomPanelHeightWithoutCorner,
  } = useSizes();
  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    openModal(<LeaveWindowPIXI />);
  };

  const handleCardClick = useCallback(
    (card: GameObjects.Card) => {
      setSelectedUnit(null);
      if (selectedCard?.id === card.id) {
        setSelectedCard(null);
        setActions([]);
        return;
      }
      setSelectedCard(card);
      setActions(card.getPossibleCardActions([...buildings, ...units]));
    },
    [selectedCard],
  );

  return (
    <Stage width={windowSize.width} height={windowSize.height}>
      <Container
        x={sidePanelLeft.desiredSize.width}
        y={topPanelHeightWithoutCorner}
        {...map.desiredSize}
        scale={map.scale}
      >
        {children}
      </Container>
      <SidePanel side="Left" />
      <SidePanel side="Right" />
      <Container>
        <Sprite image={`resources/img/map/hud/top-panel.png`} scale={topPanel.scale} {...topPanel.desiredSize}>
          <CoinBar coins={currentPlayer?.coins ?? 0} />
          <EnergyBar energy={currentPlayer?.energy ?? 0} />
          <TimerBar time={'42:13'} />
          <Container>
            <Sprite
              interactive={true}
              pointerdown={() => handleOpenModal()}
              x={innerWidth - homeButton.desiredSize.width}
              {...homeButton.desiredSize}
              scale={homeButton.scale}
              image={`resources/img/map/hud/home.png`}
            />
            <Sprite
              interactive={true}
              pointerdown={() => handleOpenModal()}
              x={innerWidth - homeButton.desiredSize.width - surrenderButton.desiredSize.width - 100}
              {...surrenderButton.desiredSize}
              scale={surrenderButton.scale}
              image={`resources/img/map/hud/surrender.png`}
            />
          </Container>
        </Sprite>
      </Container>
      <Container>
        <Sprite
          roundPixels={true}
          y={windowSize.height - bottomPanel.desiredSize.height}
          image={`resources/img/map/background/bottom-panel-hd.png`}
          scale={bottomPanel.scale}
          {...bottomPanel.desiredSize}
        >
          <Cards
            selectedCard={selectedCard}
            cards={cards.filter((card) => card.team === currentPlayer?.team)}
            onClick={handleCardClick}
          />
          <Sprite
            image={'resources/img/map/hud/play-button-hd.png'}
            x={bottomPanel.desiredSize.width - moveButton.desiredSize.width / 2}
            y={bottomPanel.desiredSize.height - bottomPanelHeightWithoutCorner}
            {...moveButton.desiredSize}
            scale={moveButton.scale}
            interactive={true}
            click={() => {
              makeTurn(getTurn());
            }}
          />
        </Sprite>
      </Container>
    </Stage>
  );
};
