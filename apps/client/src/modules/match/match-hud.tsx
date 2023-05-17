import { Container, Graphics, Sprite, Stage } from '@pixi/react';
import { FC, ReactNode, useCallback, useRef, useState } from 'react';
import { create } from 'zustand';

import { CoinBar } from '../../components/hud/coin-bar/coin-bar';
import { HudHealthBar } from '../../components/hud/health-bar/health-bar';
import { LeaveWindowPIXI } from '../../components/hud/leave-window/leave-window';
import { TimerBar } from '../../components/hud/timer-bar/timer-bar';
import { useModalContext } from '../../hooks/use-modal';
import { Card, CreateGameObject, Teams, Unit, UnitActions, UnitTypes } from './match-map';
import { useSizes } from './utils/sprite-sizes';

// setUnit((previous) => {
//   return [
//     ...previous,
//     new Unit({
//       x: 3,
//       y: 3,
//       damage: 3,
//       hp: 5,
//       radius: 1,
//       source: 'resources/img/map/units/Worker_blue.png',
//       type: 'warrior',
//     }),
//   ];
// });

export const useUser = create((set, get) => ({
  units: [],
  resources: {
    gold: 0,
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
  setUnitActions: React.Dispatch<React.SetStateAction<UnitActions[]>>;
  unitsList: Unit[];
  selected: Unit | Card | null;
  setSelected: React.Dispatch<React.SetStateAction<Unit | Card | null>>;
};

export const BattleHud: FC<BattleHudprops> = ({
  children,
  unitsList,
  setUnitActions,
  setSelected,
  selected,
}) => {
  const cards = useUser((state) => state.cards);
  const { bottomPanel, cardSize, sidePanelLeft, sidePanelRight, topPanel, windowSize, map } =
    useSizes();
  const { openModal } = useModalContext();
  const handleOpenModal = () => {
    const content = <LeaveWindowPIXI />;
    openModal(content);
  };

  const cardHandler = () => {
    const card = new Card({
      radius: 2,
      damage: 1,
      hp: 3,
      source: 'resources/img/map/units/Worker_blue.png',
      type: UnitTypes.WARRIOR,
      team: Teams.BLUE,
    });
    if (selected?.id === card.id) {
      setSelected(null);
      setUnitActions([]);
      return;
    }
    setSelected(card);
    setUnitActions(card.getPossibleCardActions(unitsList));
  };
  console.log(
    windowSize.width,
    sidePanelLeft.desiredSize.width * -1,
    sidePanelRight.desiredSize.width,
  );

  const draw = useCallback((g) => {
    g.clear();
    g.beginFill(0xff_70_0b, 1);
    g.drawRect(0, 100, windowSize.width, windowSize.height);
    g.lineStyle(2, 0xff_00_ff, 1);
  }, []);

  const spriteReference = useRef(null);

  return (
    <Stage width={windowSize.width} height={windowSize.height}>
      <Graphics draw={draw} ref={spriteReference} />
      <Container
        x={sidePanelLeft.desiredSize.width * -1}
        y={topPanel.desiredSize.height / 1.67}
        {...map.desiredSize}
        scale={map.scale}
      >
        {children}
      </Container>
      <Container>
        <Sprite image={`resources/img/map/hud/top-panel.png`} scale={topPanel.scale}>
          {CoinBar({ coins: 99 })}
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
          y={topPanel.desiredSize.height / 1.8}
          image={`resources/img/map/hud/side-panel.png`}
          scale={sidePanelRight.scale}
        >
          <Container>
            <Sprite anchor={[0, -0.35]} image={`resources/img/map/hud/health-bar-empty.png`}>
              {HudHealthBar({ hp: 100 })}
              <Sprite anchor={[0, -0.35]} image={`resources/img/map/hud/flask.png`} />
            </Sprite>
          </Container>
        </Sprite>
      </Container>
      <Container>
        <Sprite
          y={topPanel.desiredSize.height / 1.8}
          x={windowSize.width}
          image={`resources/img/map/hud/side-panel.png`}
          scale={sidePanelLeft.scale}
        >
          <Container>
            <Sprite anchor={[0, -0.35]} image={`resources/img/map/hud/health-bar-empty.png`}>
              {HudHealthBar({ hp: 100 })}
              <Sprite anchor={[0, -0.35]} image={`resources/img/map/hud/flask.png`} />
            </Sprite>
          </Container>
        </Sprite>
      </Container>
      <Container>
        <Sprite
          roundPixels={true}
          x={0}
          y={windowSize.height - bottomPanel.desiredSize.height}
          image={`resources/img/map/hud/bottom-panel.png`}
          scale={bottomPanel.scale}
        >
          {cards.map((card, index) => (
            <CreateGameObject
              key={index}
              scale={{ x: 0.1, y: 0.1 }}
              source={card.source}
              x={
                cards.length <= 2
                  ? bottomPanel.originalSize.width / 2 +
                    cardSize.originalSize.width * 0.1 * index -
                    cardSize.originalSize.width * 0.1
                  : bottomPanel.originalSize.width / cards.length +
                    cardSize.originalSize.width * 0.1 * index
              }
              y={15}
              hoverOutHandler={(e) => {
                e.target.y += 20;
              }}
              hoverhandler={(e) => {
                e.target.y -= 20;
              }}
              handleClick={cardHandler}
            />
          ))}
        </Sprite>
      </Container>
    </Stage>
  );
};
