import { FC, useState } from 'react';

import styles from './health-bar.module.css';

const HEALTH_BAR_COLOR_PICKER = {
  LOW_HP: '#B22222',
  HALF_HP: '#FF8825',
  FULL_HP: '#228B22',
} as const;

const HEALTH_BAR_COLOR_STATE: Record<number, { color: string }> = {
  0: { color: HEALTH_BAR_COLOR_PICKER.LOW_HP },
  1: { color: HEALTH_BAR_COLOR_PICKER.LOW_HP },
  2: { color: HEALTH_BAR_COLOR_PICKER.HALF_HP },
  3: { color: HEALTH_BAR_COLOR_PICKER.FULL_HP },
} as const;
const INITIAL_USER_HEALTH: number = 3 as const;
const MINIMAL_USER_HEALTH: number = 0 as const;
const DAMAGE_USER_HEALTH: number = 1 as const;

export { DAMAGE_USER_HEALTH, HEALTH_BAR_COLOR_STATE, INITIAL_USER_HEALTH, MINIMAL_USER_HEALTH };

type HealthBarProperties = {
  health: number;
};

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

export const useHealthBarHandler = () => {
  const [health, setHealth] = useState(INITIAL_USER_HEALTH);
  const OnDamageReceived = () =>
    setHealth((previous) =>
      previous === MINIMAL_USER_HEALTH ? INITIAL_USER_HEALTH : previous - DAMAGE_USER_HEALTH,
    );
  return { health, OnDamageReceived };
};
