import { FC } from 'react';

import { AuthorizationButton } from '../../components/authorization/authorization-button/authorization-button';
import { AuthorizationHeader } from '../../components/authorization/authorization-header/authorization-header';
import { healthBarHandler } from '../../components/authorization/authorization-header/health-bar/health-bar';
import { AuthorizationWrapper } from '../../components/authorization/authorization-page-wrapper/authorization-page-wrapper';
import { SignInForm } from './sign-in-form';
import styles from './sign-in-page.module.css';

export const SignIn: FC = () => {
  const { health, OnDamageReceived } = healthBarHandler();
  return (
    <AuthorizationWrapper>
      <div className={styles.signIn}>
        <AuthorizationHeader health={health} />
        <SignInForm onSubmit={OnDamageReceived} />
        <div className={styles.signInButtons}>
          <AuthorizationButton />
        </div>
      </div>
    </AuthorizationWrapper>
  );
};
