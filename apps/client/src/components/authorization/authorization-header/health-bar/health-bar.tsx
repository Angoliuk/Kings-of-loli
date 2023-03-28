import { FC, useState } from 'react';

import {
  DAMAGE_USER_HEALTH,
  HEALTH_BAR_COLOR_STATE,
  INITIAL_USER_HEALTH,
  MINIMAL_USER_HEALTH,
} from '../../../../constants/health-bar';
import { HealthBarProperties } from '../../../../interfaces/authorization-form/authorization-form-health-bar-properties';
import styles from './health-bar.module.css';

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
