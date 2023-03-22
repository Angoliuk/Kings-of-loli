import { FC } from 'react';

import { HEALTH_BAR_COLOR_STATE } from '../../../../constants/health-bar-const';
import { HealthBarProperties } from '../../../../interfaces/authorization-form-interfaces/authorization-form-health-bar-properties';
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
