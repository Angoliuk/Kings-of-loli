import { Container, Graphics, Sprite, Stage } from '@pixi/react';
import { FC, ReactNode, useCallback, useRef, useState } from 'react';
import { create } from 'zustand';

import { CoinBar } from '../../components/hud/coin-bar/coin-bar';
import { HudHealthBar } from '../../components/hud/health-bar/health-bar';
import { LeaveWindowPIXI } from '../../components/hud/leave-window/leave-window';
import { TimerBar } from '../../components/hud/timer-bar/timer-bar';
import { useModalContext } from '../../hooks/use-modal';
import { UnitAction } from './actions/actions';
import { Cards } from './cards/cards';
import { Card, Teams, Unit, UnitTypes } from './match-map';
import { SidePanel } from './side-panel/side-panel';
import { useSizes } from './utils/sprite-sizes';

export const useUser = create((set, get) => ({
  units: [],
  resources: {
    gold: 42,
    energy: 0,
    hp: 0,
  },
  cards: [
    new Card({
      team: Teams.BLUE,
      radius: 2,
      damage: 1,
      hp: 3,
      source: 'resources/img/cards/peasant-card.png',
      type: UnitTypes.WARRIOR,
    }),
    new Card({
      team: Teams.BLUE,
      radius: 2,
      damage: 1,
      hp: 3,
      source: 'resources/img/cards/peasant-card.png',
      type: UnitTypes.WARRIOR,
    }),
    new Card({
      team: Teams.BLUE,
      radius: 2,
      damage: 1,
      hp: 3,
      source: 'resources/img/cards/peasant-card.png',
      type: UnitTypes.WARRIOR,
    }),
  ],

  time: '00:00',

  addUnit: (newUnit) => set({ units: [...get().units, newUnit] }),
  addCard: (newCard) => set({ cards: [...get().cards, newCard] }),
  // popCard:(card)

  decrementGold: (gold) =>
    set({ resources: { ...get().resources, gold: get().resources.gold - gold } }),
  incrementGold: (gold) =>
    set({ resources: { ...get().resources, gold: get().resources.gold + gold } }),

  decrementEnergy: (energy) =>
    set({ resources: { ...get().resources, energy: get().resources.energy - energy } }),
  incrementEnergy: (energy) =>
    set({ resources: { ...get().resources, energy: get().resources.energy + energy } }),

  decrementHp: (hp) => set({ resources: { ...get().resources, hp: get().resources.hp - hp } }),
  incrementHp: (hp) => set({ resources: { ...get().resources, hp: get().resources.hp + hp } }),

  setTime: (time) => set({ time: time }),
}));
type BattleHudprops = {
  children: ReactNode;
  setUnitActions: React.Dispatch<React.SetStateAction<UnitAction[]>>;
  unitsList: Unit[];
};

export const BattleHud: FC<BattleHudprops> = ({ children, unitsList, setUnitActions }) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const cards = useUser((state) => state.cards);
  const { gold }: number = useUser((state) => state.resources);
  const { bottomPanel, sidePanelLeft, topPanel, windowSize, map } = useSizes();
  const { openModal } = useModalContext();
  const handleOpenModal = () => {
    const content = <LeaveWindowPIXI />;
    openModal(content);
  };

  const cardHandler = useCallback(
    (card: Card) => {
      if (selectedCard?.id === card.id) {
        setSelectedCard(null);
        setUnitActions([]);
        return;
      }
      setSelectedCard(card);
      setUnitActions(card.getPossibleCardActions(unitsList));
    },
    [selectedCard],
  );
  const draw = useCallback((g) => {
    g.clear();
    g.beginFill(0xff_70_0b, 1);
    g.drawRect(0, 0, windowSize.width, windowSize.height);
    g.lineStyle(2, 0xff_00_ff, 1);
  }, []);

  const spriteReference = useRef(null);

  return (
    <Stage width={windowSize.width} height={windowSize.height}>
      <Graphics draw={draw} ref={spriteReference} />
      <Container
        x={sidePanelLeft.desiredSize.width}
        y={topPanel.desiredSize.height / 1.67}
        {...map.desiredSize}
        scale={map.scale}
      >
        {children}
      </Container>
      <SidePanel side="Left" />
      <SidePanel side="Right" />
      <Container>
        <Sprite
          image={`resources/img/map/hud/top-panel.png`}
          scale={topPanel.scale}
          {...topPanel.desiredSize}
        >
          {CoinBar({ coins: gold })}
          <Container>
            <Sprite anchor={[-1.05, 0]} image={`resources/img/map/hud/energy-bar-inactive.png`}>
              <Sprite anchor={[-19.2, 0]} image={`resources/img/map/hud/enery-active.png`} />
              <Sprite anchor={[-20.4, 0]} image={`resources/img/map/hud/enery-active.png`} />
              <Sprite anchor={[-21.6, 0]} image={`resources/img/map/hud/enery-active.png`} />
              <Sprite anchor={[-22.8, 0]} image={`resources/img/map/hud/enery-active.png`} />
              <Sprite anchor={[-24, 0]} image={`resources/img/map/hud/enery-active.png`} />
            </Sprite>
          </Container>
          {TimerBar({ time: '42:13' })}
          <Container>
            <Sprite
              interactive={true}
              pointerdown={() => handleOpenModal()}
              anchor={[-26, 0]}
              image={`resources/img/map/hud/home.png`}
            />
            <Sprite
              interactive={true}
              pointerdown={() => handleOpenModal()}
              anchor={[-22, 0]}
              image={`resources/img/map/hud/surrender.png`}
            />
          </Container>
        </Sprite>
      </Container>
      <Container>
        <Sprite
          roundPixels={true}
          x={0}
          y={windowSize.height - bottomPanel.desiredSize.height}
          image={`resources/img/map/background/bottom-panel-hd.png`}
          scale={bottomPanel.scale}
          {...bottomPanel.desiredSize}
        >
          <Cards selectedCard={selectedCard} cards={cards} onClick={cardHandler} />
        </Sprite>
      </Container>
    </Stage>
  );
};
