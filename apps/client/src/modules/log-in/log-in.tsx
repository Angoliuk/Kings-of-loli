import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthorizationButton } from '../../components/authorizarion-button/authorization-button';
import { AuthorizationHeader } from '../../components/authorization-header/authorization-header';
import { AuthorizationWrapper } from '../../components/authorization-page-wrapper/authorization-page-wrapper';
import { useAuthStore } from '../../store/auth-store/auth-store';
import styles from './log-in.module.css';
import { LogInForm } from './log-in-form/log-in-form';

export const LogIn: FC = () => {
  const [health, setHealth] = useState(3);
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();
  const healthDecrement = () => {
    setToken('hui');
    navigate('/');
    setHealth((previous) => (previous === 0 ? 3 : previous - 1));
  };

  return (
    <AuthorizationWrapper>
      <div className={styles.logIn}>
        <AuthorizationHeader health={health} />
        <LogInForm onSubmit={healthDecrement} />
        <div className={styles.logInButtons}>
          <AuthorizationButton />
        </div>
      </div>
    </AuthorizationWrapper>
  );
};
