import { type FC } from 'react';

import styles from './error-message.module.css';
type FormErrorMessageProperties = {
  message?: string;
};

export const FormErrorMessage: FC<FormErrorMessageProperties> = ({ message }) => {
  return <span className={styles.message}>{message}</span>;
};
