import { type FC, type ReactNode } from 'react';

import styles from './lock-modal-wrapper.module.css';

type ModalLockProperties = {
  children: ReactNode;
};

export const ModalLockWrapper: FC<ModalLockProperties> = ({ children }) => {
  return <div className={styles.lockScreen}>{children}</div>;
};
