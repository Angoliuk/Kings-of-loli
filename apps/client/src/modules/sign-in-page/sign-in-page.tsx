import { FC, useState } from 'react';

import { AuthorizationButton } from '../../components/authorization/authorization-button/authorization-button';
import { AuthorizationHeader } from '../../components/authorization/authorization-header/authorization-header';
import { AuthorizationWrapper } from '../../components/authorization/authorization-page-wrapper/authorization-page-wrapper';
import {
  DAMAGE_USER_HEALTH,
  INITIAL_USER_HEALTH,
  MINIMAL_USER_HEALTH,
} from '../../constants/health-bar';
import { SignInForm } from './sign-in-form';
import styles from './sign-in-page.module.css';

export const SignIn: FC = () => {
  const [health, setHealth] = useState(INITIAL_USER_HEALTH);
  const OnDamageReceived = () =>
    setHealth((previous) =>
      previous === MINIMAL_USER_HEALTH ? INITIAL_USER_HEALTH : previous - DAMAGE_USER_HEALTH,
    );
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
