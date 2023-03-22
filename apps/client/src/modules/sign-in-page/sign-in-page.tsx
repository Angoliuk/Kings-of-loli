import { FC, useState } from 'react';

import { AuthorizationButton } from '../../components/authorization-components/authorization-button-component';
import { AuthorizationHeader } from '../../components/authorization-components/authorization-header-component/authorization-header-component';
import { AuthorizationWrapper } from '../../components/authorization-page-wrapper-component';
import {
  DAMAGE_USER_HEALTH,
  INITIAL_USER_HEALTH,
  MINIMAL_USER_HEALTH,
} from '../../constants/health-bar-const';
import { SignInForm } from './sign-in-form';
import styles from './sign-in-page.module.css';

export const SignIn: FC = () => {
  const [health, setHealth] = useState(INITIAL_USER_HEALTH);
  const healthHandler = () =>
    setHealth((previous) =>
      previous === MINIMAL_USER_HEALTH ? INITIAL_USER_HEALTH : previous - DAMAGE_USER_HEALTH,
    );
  return (
    <AuthorizationWrapper>
      <div className={styles.signIn}>
        <AuthorizationHeader health={health} />
        <SignInForm onSubmit={healthHandler} />
        <div className={styles.signInButtons}>
          <AuthorizationButton />
        </div>
      </div>
    </AuthorizationWrapper>
  );
};
