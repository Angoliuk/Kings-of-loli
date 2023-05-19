import { AuthorizationButton } from '@web/components/authorization/button/button';
import { AuthorizationHeader } from '@web/components/authorization/header/header';
import { useHealthBarHandler } from '@web/components/authorization/health-bar/health-bar';
import { AuthorizationWrapper } from '@web/components/authorization/page-wrapper/page-wrapper';
import { type FC } from 'react';

import { SignInForm } from './sign-in-form';
import styles from './sign-in-page.module.css';

export const SignIn: FC = () => {
  const { health, OnDamageReceived } = useHealthBarHandler();
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
