import { useState, VFC } from 'react';

import styles from './counter.module.css';

interface CounterProperties {
  start?: number;
}

export const Counter: VFC<CounterProperties> = ({ start = 0 }) => {
  const [count, setCount] = useState(start);

  const handleIncrement = () => setCount(count + 1);

  const handleDecrement = () => setCount(count - 1);

  return (
    <div className={styles.counterWrapper}>
      <button className={styles.button} onClick={handleIncrement}>
        +
      </button>
      <p>{count}</p>
      <button className={styles.button} onClick={handleDecrement}>
        -
      </button>
    </div>
  );
};
