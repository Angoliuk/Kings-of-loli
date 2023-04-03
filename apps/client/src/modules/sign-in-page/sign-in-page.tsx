import { FC } from 'react';

import { AuthorizationButton } from '../../components/authorization/button/button';
import { AuthorizationHeader } from '../../components/authorization/header/header';
import { healthBarHandler } from '../../components/authorization/health-bar/health-bar';
import { AuthorizationWrapper } from '../../components/authorization/page-wrapper/page-wrapper';
import { SignInForm } from './sign-in-form';
import styles from './sign-in-page.module.css';

export const SignIn: FC = () => {
  const { health, OnDamageReceived } = healthBarHandler();
  return (
    <AuthorizationWrapper health={health}>
      <div className={styles.signIn}>
        <div className={styles.form}>
          <AuthorizationHeader />
          <SignInForm onSubmit={OnDamageReceived} />
        </div>
        <div className={styles.signInButtons}>
          <AuthorizationButton />
        </div>
      </div>
    </AuthorizationWrapper>
  );
};
