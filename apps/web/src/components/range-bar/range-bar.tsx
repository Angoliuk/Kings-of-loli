import { type FC, useRef, useState } from 'react';

import styles from './range-bar.module.css';

type RangeBarProperties = {
  value?: number;
  tabIndex?: number;
};

const SLIDER_MIN_VALUE = 0 as const;
const SLIDER_MAX_VALUE = 100 as const;
const SLIDER_STEP_VALUE = 10 as const;

export const RangeBar: FC<RangeBarProperties> = ({ value = SLIDER_MAX_VALUE, tabIndex }) => {
  const [progress, setProgress] = useState(value);
  const RangeReference = useRef<HTMLInputElement>(null);
  const moveThumb = (event: MouseEvent) => {
    if (!RangeReference.current) return;
    const left = RangeReference.current.offsetLeft;
    const width = RangeReference.current.clientWidth;
    const newValue = Math.max(
      SLIDER_MIN_VALUE,
      Math.min(SLIDER_MAX_VALUE, SLIDER_MAX_VALUE - ((event.pageX - left) / width) * SLIDER_MAX_VALUE),
    );
    setProgress(newValue);
  };

  const handleKeyPress = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
    if (key == 'ArrowRight' || key == 'ArrowUp') {
      const newValue = Math.max(SLIDER_MIN_VALUE, Math.min(SLIDER_MAX_VALUE, progress - SLIDER_STEP_VALUE));
      setProgress(newValue);
    } else if (key == 'ArrowLeft' || key == 'ArrowDown') {
      const newValue = Math.max(SLIDER_MIN_VALUE, Math.min(SLIDER_MAX_VALUE, progress + SLIDER_STEP_VALUE));
      setProgress(newValue);
    }
  };
  const progressHandler = ({ target }: React.MouseEvent<HTMLDivElement>): void => {
    target.addEventListener('mousemove', moveThumb);
    target.addEventListener('mouseup', () => target.removeEventListener('mousemove', moveThumb));
  };
  return (
    <div
      role="slider"
      tabIndex={tabIndex}
      aria-valuemin={SLIDER_MIN_VALUE}
      aria-valuemax={SLIDER_MAX_VALUE}
      aria-valuenow={progress}
      className={styles.rangeBar}
      onMouseDown={progressHandler}
      onKeyDown={handleKeyPress}
      ref={RangeReference}
    >
      <div className={styles.rangeProgress}>
        <div className={styles.currentProgres} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};
