import React, { FC, useState } from 'react';
import { v4 } from 'uuid';

import { ThemePicker } from '../../svg/theme-icon/theme-picker';
import styles from './background-picker.module.css';

interface BackgroundTextEventTarget extends EventTarget {
  name: string;
}

interface BackgroundMouseEvent extends React.MouseEvent<HTMLButtonElement> {
  target: BackgroundTextEventTarget;
}

const imgInput: { name: string; src: string; id: string }[] = [
  {
    name: 'large_1',
    src: 'src/img/leaderboard-background/small_1.jpg',
    id: v4(),
  },
  {
    name: 'large_2',
    src: 'src/img/leaderboard-background/small_2.jpg',
    id: v4(),
  },
  {
    name: 'large_3',
    src: 'src/img/leaderboard-background/small_3.jpg',
    id: v4(),
  },
  {
    name: 'large_4',
    src: 'src/img/leaderboard-background/small_4.jpg',
    id: v4(),
  },
];
type PropertiesImg = {
  imgBackground: string;
};
export const BackgroundPicker: FC<PropertiesImg> = ({ imgBackground }) => {
  const [isActive, setActive] = useState(false);
  const [sourceImg, setImage] = useState(
    imgBackground || 'src/img/leaderboard-background/large_1.jpg',
  );
  const toggle = () => {
    setActive(!isActive);
  };
  const handler = (event: BackgroundMouseEvent) => {
    const name = event.currentTarget.name;
    const link = 'src/img/leaderboard-background/' + name + '.jpg';
    console.log(link);
    return setImage(link);
  };

  return (
    <>
      <img className={styles.backgroundImg} src={sourceImg} alt="BEE TIFULL BG" />
      <div className={styles.themePicker}>
        <button onClick={toggle} className={styles.themePickerButton}>
          <ThemePicker className={styles.icon} />
        </button>
        {isActive ? (
          <span className={styles.themeImg}>
            {imgInput.map((img) => {
              return (
                <button
                  key={img.id}
                  onClick={handler}
                  name={img.name}
                  className={styles.themeButton}
                >
                  <img src={img.src} alt="Beatiful FuckGoround" className={styles.themeImg} />
                </button>
              );
            })}
          </span>
        ) : undefined}
      </div>
    </>
  );
};
