import { Container, Sprite, Stage } from '@pixi/react';
import { CoinBar } from '@web/components/hud/coin-bar/coin-bar';
import { LeaveWindowPIXI } from '@web/components/hud/leave-window/leave-window';
import { TimerBar } from '@web/components/hud/timer-bar/timer-bar';
import { useModalContext } from '@web/hooks/use-modal';
import { type FC, type ReactNode, useCallback } from 'react';
import { create } from 'zustand';

import { type UnitAction } from './actions/actions';
import { Cards } from './cards/cards';
import { Card, Teams, Unit, UnitTypes } from './match-map';
import { SidePanel } from './side-panel/side-panel';
import { useSizes } from './utils/sprite-sizes';

type useUserPorps = {
  units: Unit[];
  resources: {
    gold: number;
    energy: number;
    hp: number;
  };
  cards: Card[];
  time: string;
  addUnit: (newUnit: Unit) => void;
  killUnit: (unitId: number) => void;
  addnCard: (newCard: Card) => void;
  removeCard: (cardId: number) => void;
  decrementGold: (gold: number) => void;
  incrementGold: (gold: number) => void;
  decrementEnergy: (energy: number) => void;
  incrementEnergy: (energy: number) => void;
  decrementHp: (hp: number) => void;
  incrementHp: (hp: number) => void;
  setTime: (time: string) => void;
};

const GameUnitPossibleStats = {
  unit: {
    damage: [1, 4],
    hp: [1, 6],
    radius: [1, 2],
    energy: [1, 4],
  },
  card: {
    damage: [1, 4],
    hp: [1, 6],
    radius: [1, 2],
    team: Teams,
    type: UnitTypes,
    price: [2, 6],
    energy: [1, 4],
  },
  build: {
    hp: [2, 6],
    team: Teams,
    type: UnitTypes, // enum for Build
    price: [1, 5],
  },
};

const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const useUser = create<useUserPorps>((set, get) => ({
  units: [
    new Unit({
      coords: { x: 1, y: 1 },
      damage: randomIntFromInterval(GameUnitPossibleStats.unit.damage[0], GameUnitPossibleStats.unit.damage[1]),
      hp: randomIntFromInterval(GameUnitPossibleStats.unit.hp[0], GameUnitPossibleStats.unit.hp[1]),
      radius: randomIntFromInterval(GameUnitPossibleStats.unit.radius[0], GameUnitPossibleStats.unit.radius[1]),
      source: 'resources/img/map/units/Worker_green.png',
      type: UnitTypes.WARRIOR,
      team: Teams.GREEN,
      energy: randomIntFromInterval(GameUnitPossibleStats.unit.energy[0], GameUnitPossibleStats.unit.energy[1]),
    }),
  ],
  resources: {
    gold: 42,
    energy: 0,
    hp: 0,
  },
  cards: [
    new Card({
      team: Teams.BLUE,
      radius: randomIntFromInterval(GameUnitPossibleStats.card.radius[0], GameUnitPossibleStats.card.radius[1]),
      damage: randomIntFromInterval(GameUnitPossibleStats.card.damage[0], GameUnitPossibleStats.card.damage[1]),
      hp: randomIntFromInterval(GameUnitPossibleStats.card.damage[0], GameUnitPossibleStats.card.damage[1]),
      source: 'resources/img/cards/peasant-card.png',
      unitSource: 'resources/img/map/units/Worker_blue.png',
      type: UnitTypes.WARRIOR,
      price: randomIntFromInterval(GameUnitPossibleStats.card.price[0], GameUnitPossibleStats.card.price[1]),
      energy: randomIntFromInterval(GameUnitPossibleStats.card.energy[0], GameUnitPossibleStats.card.energy[1]),
    }),
    new Card({
      team: Teams.BLUE,
      radius: randomIntFromInterval(GameUnitPossibleStats.card.radius[0], GameUnitPossibleStats.card.radius[1]),
      damage: randomIntFromInterval(GameUnitPossibleStats.card.damage[0], GameUnitPossibleStats.card.damage[1]),
      hp: randomIntFromInterval(GameUnitPossibleStats.card.damage[0], GameUnitPossibleStats.card.damage[1]),
      source: 'resources/img/cards/peasant-card.png',
      unitSource: 'resources/img/map/units/Worker_blue.png',
      type: UnitTypes.WARRIOR,
      price: randomIntFromInterval(GameUnitPossibleStats.card.price[0], GameUnitPossibleStats.card.price[1]),
      energy: randomIntFromInterval(GameUnitPossibleStats.card.energy[0], GameUnitPossibleStats.card.energy[1]),
    }),
    new Card({
      team: Teams.BLUE,
      radius: randomIntFromInterval(GameUnitPossibleStats.card.radius[0], GameUnitPossibleStats.card.radius[1]),
      damage: randomIntFromInterval(GameUnitPossibleStats.card.damage[0], GameUnitPossibleStats.card.damage[1]),
      hp: randomIntFromInterval(GameUnitPossibleStats.card.damage[0], GameUnitPossibleStats.card.damage[1]),
      source: 'resources/img/cards/peasant-card.png',
      unitSource: 'resources/img/map/units/Worker_blue.png',
      type: UnitTypes.WARRIOR,
      price: randomIntFromInterval(GameUnitPossibleStats.card.price[0], GameUnitPossibleStats.card.price[1]),
      energy: randomIntFromInterval(GameUnitPossibleStats.card.energy[0], GameUnitPossibleStats.card.energy[1]),
    }),
  ],

  time: '00:00',

  addUnit: (newUnit) => set({ units: [...get().units, newUnit] }),
  killUnit: (unitId) => set({ units: get().units.filter((unit) => unit.id !== unitId) }),
  addnCard: (newCard) => set({ cards: [...get().cards, newCard] }),
  removeCard: (cardId) => set({ cards: get().cards.filter((card) => card.id !== cardId) }),

  decrementGold: (gold) => set({ resources: { ...get().resources, gold: get().resources.gold - gold } }),
  incrementGold: (gold) => set({ resources: { ...get().resources, gold: get().resources.gold + gold } }),

  decrementEnergy: (energy) => set({ resources: { ...get().resources, energy: get().resources.energy - energy } }),
  incrementEnergy: (energy) => set({ resources: { ...get().resources, energy: get().resources.energy + energy } }),

  decrementHp: (hp) => set({ resources: { ...get().resources, hp: get().resources.hp - hp } }),
  incrementHp: (hp) => set({ resources: { ...get().resources, hp: get().resources.hp + hp } }),

  setTime: (time) => set({ time: time }),
}));

type BattleHudprops = {
  children: ReactNode;
  setUnitActions: React.Dispatch<React.SetStateAction<UnitAction[]>>;
  unitsList: Unit[];
  selectedCard: Card | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<Card | null>>;
};

export const BattleHud: FC<BattleHudprops> = ({
  children,
  unitsList,
  setUnitActions,
  selectedCard,
  setSelectedCard,
}) => {
  const cards = useUser((state) => state.cards);
  const { gold } = useUser((state) => state.resources);
  const { bottomPanel, sidePanelLeft, topPanel, windowSize, map, homeButton, surrenderButton } = useSizes();
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

  return (
    <Stage width={windowSize.width} height={windowSize.height}>
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
        <Sprite image={`resources/img/map/hud/top-panel.png`} scale={topPanel.scale} {...topPanel.desiredSize}>
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
              x={innerWidth - homeButton.desiredSize.width}
              {...homeButton}
              image={`resources/img/map/hud/home.png`}
            />
            <Sprite
              interactive={true}
              pointerdown={() => handleOpenModal()}
              x={innerWidth - homeButton.desiredSize.width - surrenderButton.desiredSize.width - 100}
              {...surrenderButton}
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
