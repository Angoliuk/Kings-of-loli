import { FC } from 'react';

import { HEALTH_BAR_COLOR_STATE } from '../../../constants/authorization-consts/authorization-consts';
import { AuthorizationHeaderProperties } from '../../../interfaces/authorization-interfaces/authorization-form-health-bar-properties';
import styles from './health-bar.module.css';

export const HealthBar: FC<AuthorizationHeaderProperties> = ({ health }) => {
  return (
    <div className={styles.healthBar}>
      <div className={styles.health}>
        <div
          className={styles.currentHealth}
          style={{
            width: `${health * 33.33}%`,
            background: HEALTH_BAR_COLOR_STATE[health].color || HEALTH_BAR_COLOR_STATE[3].color,
          }}
        ></div>
      </div>
    </div>
  );
};
