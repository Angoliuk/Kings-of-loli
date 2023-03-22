import React, { FC, useId, useState } from 'react';

import { ThemePicker } from '../../../resources/svg/theme-icon-svg/theme-picker';
import styles from './background-picker-component.module.css';

interface BackgroundTextEventTarget extends EventTarget {
  name: string;
}

interface BackgroundMouseEvent extends React.MouseEvent<HTMLButtonElement> {
  target: BackgroundTextEventTarget;
}

type PropertiesImg = {
  imgBackground: string;
};
export const BackgroundPicker: FC<PropertiesImg> = ({ imgBackground }) => {
  const imgInput: { name: string; src: string; id: string }[] = [
    {
      name: 'large_1',
      src: 'resources/img/leaderboard-background/small_1.jpg',
      id: useId(),
    },
    {
      name: 'large_2',
      src: 'resources/img/leaderboard-background/small_2.jpg',
      id: useId(),
    },
    {
      name: 'large_3',
      src: 'resources/img/leaderboard-background/small_3.jpg',
      id: useId(),
    },
    {
      name: 'large_4',
      src: 'resources/img/leaderboard-background/small_4.jpg',
      id: useId(),
    },
  ];
  const [isActive, setActive] = useState(false);
  const [sourceImg, setImage] = useState(
    imgBackground || 'resources/img/leaderboard-background/large_1.jpg',
  );
  const showThemeList = () => {
    setActive(!isActive);
  };
  const handler = (event: BackgroundMouseEvent) => {
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
        ) : // eslint-disable-next-line unicorn/no-null
        null}
      </div>
    </>
  );
};
