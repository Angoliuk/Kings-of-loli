import React, { type FC, useState } from 'react';

import { ThemePicker } from '../../../resources/svg/theme-icon-svg/theme-picker';
import styles from './background-picker.module.css';

type BackgroundTextEventTarget = EventTarget & {
  name: string;
};

type BackgroundMouseEvent = React.MouseEvent<HTMLButtonElement> & {
  target: BackgroundTextEventTarget;
};

type PropertiesImg = {
  imgBackground: string;
};

const photoList = [
  {
    name: 'large_1',
    src: 'resources/img/leaderboard-background/small_1.jpg',
    id: 1,
  },
  {
    name: 'large_2',
    src: 'resources/img/leaderboard-background/small_2.jpg',
    id: 2,
  },
  {
    name: 'large_3',
    src: 'resources/img/leaderboard-background/small_3.jpg',
    id: 3,
  },
  {
    name: 'large_4',
    src: 'resources/img/leaderboard-background/small_4.jpg',
    id: 4,
  },
];
export const BackgroundPicker: FC<PropertiesImg> = ({ imgBackground }) => {
  const [isActive, setActive] = useState(false);
  const [sourceImg, setImage] = useState(imgBackground || 'resources/img/leaderboard-background/large_1.jpg');
  const showThemeList = () => {
    setActive(!isActive);
  };
  const changePhoto = (event: BackgroundMouseEvent) => {
    const name = event.currentTarget.name;
    const link = 'resources/img/leaderboard-background/' + name + '.jpg';
    setImage(link);
  };

  return (
    <>
      <img className={styles.backgroundImg} src={sourceImg} alt="BEE TIFULL BG" />
      <div className={styles.themePicker}>
        <button onClick={showThemeList} className={styles.themePickerButton}>
          <ThemePicker className={styles.icon} />
        </button>
        {isActive ? (
          <span className={styles.themeImg}>
            {photoList.map((img) => {
              return (
                <button key={img.id} onClick={changePhoto} name={img.name} className={styles.themeButton}>
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
