import { Container, Sprite, Stage } from '@pixi/react';
import { CoinBar } from '@web/components/hud/coin-bar/coin-bar';
import { EnergyBar } from '@web/components/hud/energy-bar/energy-bar';
import { LeaveWindowPIXI } from '@web/components/hud/leave-window/leave-window';
import { TimerBar } from '@web/components/hud/timer-bar/timer-bar';
import { useModalContext } from '@web/hooks/use-modal';
import { useSocket } from '@web/hooks/use-socket';
import { type FC, type ReactNode, useCallback } from 'react';
import { create } from 'zustand';

import { type UnitAction } from './actions/actions';
import { Cards } from './cards/cards';
import { Build, Card, GameObjectTypes, Teams, Unit, UnitTypes } from './match-map';
import { SidePanel } from './side-panel/side-panel';
import { useSizes } from './utils/sprite-sizes';
type Card = unknown;
type Unit = unknown;
type Building = unknown;

type Player = {
  coins: number;
  energy: number;
  userId: string;
  team: string;
};

type GameCompact = {
  turnsCount: number;
  id: string;
  isFinished: boolean;
  winnedUserId: string;
};

type Game = {
  id: string;
  players: [Player, Player];
  gameObjects: {
    cards: Card;
    buildings: Building;
    units: Unit[];
  };
  isFinished: boolean;
  winnedUserId: string;
  turnsCount: number;
  turns: Turn[];
};
type Turn = {
  turn: number;

  game: GameCompact;

  player: Player;

  newObjects?: {
    cards?: Card[];
    units?: Unit[];
    building?: Building[];
  };
  removedObjects?: {
    cards?: string[];
    units?: string[];
    building?: string[];
  };
  updatedObjects?: {
    cards?: Card[];
    units?: Unit[];
    building?: Building[];
  };
};

type TurnProperties = {
  updateTurn: (updatedTurn: Turn) => void;
  setPlayerResources: (resources: number, field: Resources) => void;
  updateNewObjects: (object: Card | Unit | Build, field: TurnObjects) => void;
  updateRemovedObjects: (object: Card | Unit | Build, field: TurnObjects) => void;
  updateUpdatedObjects: (object: Card | Unit | Build, field: TurnObjects) => void;
} & Turn;
export enum Resources {
  COINS = 'coins',
  ENERGY = 'energy',
  HP = 'hp',
}
export enum TurnObjects {
  BUILDING = 'building',
  CARDS = 'cards',
  UNITS = 'units',
}
type useUserPorps = {
  userId: number;
  units: Unit[];
  builds: Build[];
  playerTeam: Teams;
  resources: {
    coins: number;
    energy: number;
    hp: number;
  };
  cards: Card[];
  time: string;

  addUnit: (newObject: Unit[]) => void;
  updatedUnit: (updatedUnit: Unit) => void;
  killUnit: (unitId: number[]) => void;
  addnCard: (newCard: Card[]) => void;
  removeCard: (cardId: number[]) => void;
  decremenResources: (value: number, resource: Resources) => void;
  incrementResources: (value: number, resource: Resources) => void;
  setTime: (time: string) => void;
};

export const GameUnitPossibleStats = {
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

export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const useUser = create<useUserPorps>((set, get) => ({
  userId: Math.random() * 10,
  playerTeam: Teams.GREEN,
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
      possibleMoves: 3,
      unitType: GameObjectTypes.UNIT,
    }),
    new Unit({
      coords: { x: 2, y: 2 },
      damage: randomIntFromInterval(GameUnitPossibleStats.unit.damage[0], GameUnitPossibleStats.unit.damage[1]),
      hp: randomIntFromInterval(GameUnitPossibleStats.unit.hp[0], GameUnitPossibleStats.unit.hp[1]),
      radius: randomIntFromInterval(GameUnitPossibleStats.unit.radius[0], GameUnitPossibleStats.unit.radius[1]),
      source: 'resources/img/map/units/Worker_blue.png',
      type: UnitTypes.WARRIOR,
      team: Teams.BLUE,
      energy: randomIntFromInterval(GameUnitPossibleStats.unit.energy[0], GameUnitPossibleStats.unit.energy[1]),
      possibleMoves: 1,
      unitType: GameObjectTypes.UNIT,
    }),
  ],
  builds: [
    new Build({
      coords: [
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      hp: 6,
      source: 'resources/img/map/units/mill-hd.png',
      team: Teams.BLUE,
      type: UnitTypes.BUILD,
      unitType: GameObjectTypes.BUILD,
    }),
    new Build({
      coords: [
        { x: 0, y: 4 },
        { x: 0, y: 5 },
      ],
      hp: 6,
      source: 'resources/img/map/units/mill-hd.png',
      team: Teams.BLUE,
      type: UnitTypes.BUILD,
      unitType: GameObjectTypes.BUILD,
    }),
  ],
  resources: {
    coins: 42,
    energy: 10,
    hp: 0,
  },
  cards: [
    new Card({
      team: Teams.GREEN,
      radius: randomIntFromInterval(GameUnitPossibleStats.card.radius[0], GameUnitPossibleStats.card.radius[1]),
      damage: randomIntFromInterval(GameUnitPossibleStats.card.damage[0], GameUnitPossibleStats.card.damage[1]),
      hp: randomIntFromInterval(GameUnitPossibleStats.card.damage[0], GameUnitPossibleStats.card.damage[1]),
      source: 'resources/img/cards/peasant-card.png',
      unitSource: 'resources/img/map/units/Worker_blue.png',
      type: UnitTypes.WARRIOR,
      price: randomIntFromInterval(GameUnitPossibleStats.card.price[0], GameUnitPossibleStats.card.price[1]),
      energy: randomIntFromInterval(GameUnitPossibleStats.card.energy[0], GameUnitPossibleStats.card.energy[1]),
      possibleMoves: 2,
      unitType: GameObjectTypes.CARD,
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
      possibleMoves: 1,
      unitType: GameObjectTypes.CARD,
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
      possibleMoves: 1,
      unitType: GameObjectTypes.CARD,
    }),
  ],

  time: '00:00',

  updatedUnit: (updatedObjects) =>
    set({
      units: [
        [...get().units, ...updatedObjects].reduce((map, object) => {
          map = object;
          return map;
        }, {}),
      ],
    }),
  // updatedUnit: (updatedObjectArray) =>
  //   set({
  //     units: get().units.map((object) => updatedObjectArray.find((unit) => (unit.id === object.id ? unit : object))),
  //   }),

  addUnit: (newUnit) => set({ units: [...get().units, ...newUnit] }),
  killUnit: (unitsId) => set({ units: get().units.filter((unit) => !unitsId.includes(unit.id)) }),
  addnCard: (newCard) => set({ cards: [...get().cards, ...newCard] }),
  removeCard: (cardsId) => set({ cards: get().cards.filter((card) => !cardsId.includes(card.id)) }),

  decremenResources: (value, resource) =>
    set({ resources: { ...get().resources, [resource]: get().resources[resource] - value } }),

  incrementResources: (value, resource) =>
    set({ resources: { ...get().resources, [resource]: get().resources[resource] + value } }),

  setTime: (time) => set({ time: time }),
}));

const initialStateTurn = {
  turn: 10,
  game: null,
  player: null,
  newObjects: {
    cards: [],
    units: [],
    building: [],
  },
  removedObjects: {
    cards: [],
    units: [],
    building: [],
  },
  updatedObjects: {
    cards: [],
    units: [],
    building: [],
  },
};

export const useTurn = create<TurnProperties>((set, get) => ({
  turn: 0,
  game: null,
  player: null,
  newObjects: {
    building: [],
    cards: [],
    units: [],
  },
  removedObjects: {
    building: [],
    cards: [],
    units: [],
  },
  updatedObjects: {
    building: [],
    cards: [],
    units: [],
  },

  updateTurn: (updatedTurn) => {
    set((state) => ({
      ...state,
      ...updatedTurn,
    }));
  },
  updateNewObjects: (object, field) => {
    set({
      newObjects: {
        ...get().newObjects,
        [field]: [...get().newObjects[field], object],
      },
    });
  },
  updateRemovedObjects: (object, field) => {
    set({
      removedObjects: {
        ...get().removedObjects,
        [field]: [...get().removedObjects[field], object.id],
      },
    });
  },
  updateUpdatedObjects: (object, field) => {
    set({
      updatedObjects: {
        ...get().updatedObjects,
        [field]: [...get().updatedObjects[field].filter((oldObject) => oldObject.id !== object.id), object],
      },
    });
  },
}));

type BattleHudprops = {
  children: ReactNode;
  setUnitActions: React.Dispatch<React.SetStateAction<UnitAction[]>>;
  selectedCard: Card | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<Card | null>>;
};

export const BattleHud: FC<BattleHudprops> = ({ children, setUnitActions, selectedCard, setSelectedCard }) => {
  const unitsList = useUser((state) => state.units);
  const buildsList = useUser((state) => state.builds);
  const cards = useUser((state) => state.cards);
  const { coins, energy } = useUser((state) => state.resources);
  const playerTeam = useUser((state) => state.playerTeam);
  const { bottomPanel, sidePanelLeft, topPanel, windowSize, map, homeButton, surrenderButton, playButton } = useSizes();
  const { openModal } = useModalContext();
  const { turn } = useSocket();
  const test = useUser((state) => state.updatedUnit);
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
      setUnitActions(card.getPossibleCardActions(unitsList, buildsList));
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
          {CoinBar({ coins: coins })}
          <Container>
            <EnergyBar energy={energy} />
            {/* <Sprite anchor={[-0.87, 0]} image={`resources/img/map/hud/energy-bar-hd.png`} {...energyBar}></Sprite> */}
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
            <Sprite
              image={'resources/img/map/hud/play-button-hd.png'}
              x={innerWidth - playButton.desiredSize.width}
              {...playButton}
              interactive={true}
              click={() => {
                test([
                  new Unit({
                    coords: { x: 3, y: 3 },
                    damage: 1,
                    hp: 1,
                    radius: 1,
                    source: 'resources/img/map/units/Worker_blue.png',
                    type: UnitTypes.WARRIOR,
                    team: Teams.BLUE,
                    energy: 2,
                    possibleMoves: 1,
                    unitType: GameObjectTypes.UNIT,
                  }),
                ]);
              }}
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
          <Cards
            selectedCard={selectedCard}
            cards={cards.filter((card) => card.team === playerTeam)}
            onClick={cardHandler}
          />
        </Sprite>
      </Container>
    </Stage>
  );
};
