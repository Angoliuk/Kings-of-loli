import { VFC } from 'react';

import { MainPageRoute } from '../main-page-roure/main-page-route';
import styles from './app-route.module.css';
export const AppRoute: VFC = () => {
  return (
    <div className={styles.app} style={{ height: innerHeight }}>
      <MainPageRoute />
    </div>
  );
};
