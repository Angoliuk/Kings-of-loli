import { FC, useState } from 'react';

import styles from './health-bar.module.css';

const HEALTH_BAR_COLOR_STATE: Record<number, { color: string }> = {
  0: { color: '#B22222' },
  1: { color: '#B22222' },
  2: { color: '#FF8825' },
  3: { color: '#228B22' },
} as const;
const INITIAL_USER_HEALTH: number = 3 as const;
const MINIMAL_USER_HEALTH: number = 0 as const;
const DAMAGE_USER_HEALTH: number = 1 as const;

export { DAMAGE_USER_HEALTH, HEALTH_BAR_COLOR_STATE, INITIAL_USER_HEALTH, MINIMAL_USER_HEALTH };

interface HealthBarProperties {
  health: number;
}

export const HealthBar: FC<HealthBarProperties> = ({ health }) => {
  return (
    <div className={styles.healthBar}>
      <div className={styles.health}>
        <div
          className={styles.currentHealth}
          style={{
            width: `${health * 33.33}%`,
            background: HEALTH_BAR_COLOR_STATE[health].color,
          }}
        ></div>
      </div>
    </div>
  );
};

export const healthBarHandler = () => {
  const [health, setHealth] = useState(INITIAL_USER_HEALTH);
  const OnDamageReceived = () =>
    setHealth((previous) =>
      previous === MINIMAL_USER_HEALTH ? INITIAL_USER_HEALTH : previous - DAMAGE_USER_HEALTH,
    );
  return { health, OnDamageReceived };
};
