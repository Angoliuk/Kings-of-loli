import { FC } from 'react';

import { AuthorizationButton } from '../../components/authorization/button/button';
import { AuthorizationHeader } from '../../components/authorization/header/header';
import { healthBarHandler } from '../../components/authorization/health-bar/health-bar';
import { AuthorizationWrapper } from '../../components/authorization/page-wrapper/page-wrapper';
import { SignUpForm } from './sign-up-form';
import styles from './sign-up-page.module.css';

export const SignUp: FC = () => {
  const { health, OnDamageReceived } = healthBarHandler();
  return (
    <AuthorizationWrapper health={health}>
      <div className={styles.signUp}>
        <div className={styles.form}>
          <AuthorizationHeader />
          <SignUpForm onSubmit={OnDamageReceived} />
        </div>
        <div className={styles.signUpButtons}>
          <AuthorizationButton />
        </div>
      </div>
    </AuthorizationWrapper>
  );
};
