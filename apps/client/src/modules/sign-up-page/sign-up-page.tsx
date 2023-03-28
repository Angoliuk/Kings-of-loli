import { FC } from 'react';

import { AuthorizationButton } from '../../components/authorization/authorization-button/authorization-button';
import { AuthorizationHeader } from '../../components/authorization/authorization-header/authorization-header';
import { healthBarHandler } from '../../components/authorization/authorization-header/health-bar/health-bar';
import { AuthorizationWrapper } from '../../components/authorization/authorization-page-wrapper/authorization-page-wrapper';
import { SignUpForm } from './sign-up-form';
import styles from './sign-up-page.module.css';

export const SignUp: FC = () => {
  const { health, OnDamageReceived } = healthBarHandler();
  return (
    <AuthorizationWrapper>
      <div className={styles.SignUp}>
        <AuthorizationHeader health={health} />
        <SignUpForm onSubmit={OnDamageReceived} />
        <div className={styles.SignUpButtons}>
          <AuthorizationButton />
        </div>
      </div>
    </AuthorizationWrapper>
  );
};
