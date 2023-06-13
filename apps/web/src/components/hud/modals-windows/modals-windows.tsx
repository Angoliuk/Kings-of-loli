import { type Team } from '@kol/shared-game/interfaces';
import { Sprite, Stage, Text } from '@pixi/react';
import { ModalLockWrapper } from '@web/components/lock-modal-wrapper/lock-modal-wrapper';
import { useModalContext } from '@web/hooks/use-modal';
import { AppRoutes } from '@web/routes/app-router-enum';
import { TextStyle } from 'pixi.js';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './modals-windows.module.css';

export const LeaveWindowPIXI: FC = () => {
  const { closeModal } = useModalContext();
  return (
    <ModalLockWrapper>
      <Stage
        width={innerWidth}
        height={innerHeight}
        options={{
          backgroundColor: Number.parseInt('black', 16),
        }}
      >
        <Sprite image={`resources/img/map/hud/window.png`} scale={{ x: innerWidth / 132, y: innerHeight / 138 }}>
          <Sprite y={40} x={30} image={`resources/img/map/hud/main-stone.png`}>
            <Text
              text="Do you really want to leave?

                you will

            be defeated!"
              y={8}
              x={6}
              style={new TextStyle({ fontSize: 5, fill: 'white' })}
              resolution={10}
            />
          </Sprite>
          <Sprite
            interactive={true}
            pointerdown={() => closeModal()}
            y={100}
            x={30}
            image={`resources/img/map/hud/button.png`}
            scale={{ x: 0.6, y: 1 }}
          >
            <Text text="Ok" y={3} x={14} style={new TextStyle({ fontSize: 9, fill: 'white' })} resolution={10} />
          </Sprite>
          <Sprite
            interactive={true}
            pointerdown={() => closeModal()}
            y={100}
            x={78}
            image={`resources/img/map/hud/button.png`}
            scale={{ x: 0.6, y: 1 }}
          >
            <Text text="Cancel" y={3} x={7.5} style={new TextStyle({ fontSize: 9, fill: 'white' })} resolution={10} />
          </Sprite>
        </Sprite>
      </Stage>
    </ModalLockWrapper>
  );
};

export const LeaveWindowReact = () => {
  const { closeModal } = useModalContext();
  const navigate = useNavigate();
  return (
    <ModalLockWrapper>
      <div className={styles.leave}>
        <div className={styles.context}>
          <h1>
            Do tou really want to leave?
            <br /> you will <br /> be defeated!
          </h1>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              navigate(AppRoutes.Home);
              closeModal();
            }}
            className={styles.button}
          >
            Ok
          </button>
        </div>
      </div>
    </ModalLockWrapper>
  );
};
export const CommandWarningReact = ({ team }: { team: Team }) => {
  const { closeModal } = useModalContext();
  const navigate = useNavigate();
  return (
    <ModalLockWrapper>
      <div className={styles.leave}>
        <div className={styles.context}>
          <h1>You play for the , {team} team be careful</h1>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              navigate(AppRoutes.Battle);
              closeModal();
            }}
            className={styles.button}
          >
            got it
          </button>
        </div>
      </div>
    </ModalLockWrapper>
  );
};
