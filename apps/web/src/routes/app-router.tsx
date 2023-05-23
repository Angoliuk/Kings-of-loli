import { ModalProvider } from '@web/components/modal-context/modal-context';
import { useSocket } from '@web/hooks/use-socket';
import { HomePage } from '@web/modules/home-page/home-page';
import { LeaderboardContainer } from '@web/modules/leaderboard/leaderboard-container';
import { Match } from '@web/modules/match/match';
import { ProfilePage } from '@web/modules/profile-page/profile-page';
import { SettingsPage } from '@web/modules/settings-page/settings-page';
import { SignIn } from '@web/modules/sign-in-page/sign-in-page';
import { SignUp } from '@web/modules/sign-up-page/sign-up-page';
import { useAuthStore } from '@web/store/auth-store/auth-store';
import { type FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import styles from './app-router.module.css';
import { AppRoutes } from './app-router-enum';
import { GuardedRoute } from './guarded-route';

export const AppRouter: FC = () => {
  const currentUserId = useAuthStore((state) => state.user?.id);
  useSocket();

  return (
    <div className={styles.app}>
      <ModalProvider>
        <Routes>
          <Route element={<GuardedRoute isAllowed={!!currentUserId} />}>
            <Route path={AppRoutes.Home} element={<HomePage />} />
            <Route path={AppRoutes.Base} element={<Navigate to={AppRoutes.Home} />} />
            <Route path={AppRoutes.Profile} element={<ProfilePage />} />
            <Route path={AppRoutes.Stats} element={<LeaderboardContainer />} />
            <Route path={AppRoutes.Settings} element={<SettingsPage />} />
            <Route path={AppRoutes.Battle} element={<Match />} />
          </Route>
          <Route path={AppRoutes.SignUp} element={<SignUp />} />
          <Route path={AppRoutes.SignIn} element={<SignIn />} />
        </Routes>
      </ModalProvider>
    </div>
  );
};
