import { VFC } from 'react';

import styles from './authorization-background.module.css';
export const AuthorizationBackground: VFC = () => {
  return <div className={styles.background} style={{ height: innerHeight }}></div>;
};
