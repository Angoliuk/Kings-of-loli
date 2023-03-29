/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import styles from './range-bar.module.css';
const progresHandler = () => {
  return console.log(1);
};
export const RangeBar = () => {
  const progress = 0;

  return (
    <div className={styles.rangeBar} onMouseDown={progresHandler}>
      <div className={styles.rangeProgress}>
        <div className={styles.currentProgres} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};
