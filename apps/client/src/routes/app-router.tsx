import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ModalProvider } from '../components/modal-context/modal-context';
import { HomePage } from '../modules/home-page/home-page';
import { LeaderboardContainer } from '../modules/leaderboard/leaderboard-container';
import { Match } from '../modules/match/match';
import { ProfilePage } from '../modules/profile-page/profile-page';
import { SettingsPage } from '../modules/settings-page/settings-page';
import { SignIn } from '../modules/sign-in-page/sign-in-page';
import { SignUp } from '../modules/sign-up-page/sign-up-page';
import { useAuthStore } from '../store/auth-store/auth-store';
import styles from './app-router.module.css';
import { AppRoutes } from './app-router-enum';
import { GuardedRoute } from './guarded-route';

export const AppRouter: FC = () => {
  const currentUserId = useAuthStore((state) => state.user?.id);
  return (
    <div className={styles.app}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<GuardedRoute isAllowed={!!currentUserId} />}>
              <Route path={AppRoutes.Home} element={<HomePage />} />
              <Route path={AppRoutes.Base} element={<Navigate to={AppRoutes.Home} />} />
              <Route path={AppRoutes.Profile} element={<ProfilePage />} />
              <Route path={AppRoutes.Stats} element={<LeaderboardContainer />} />
              <Route path={AppRoutes.Settings} element={<SettingsPage />} />
            </Route>
            <Route path={AppRoutes.SignUp} element={<SignUp />} />
            <Route path={AppRoutes.SignIn} element={<SignIn />} />
            <Route path={AppRoutes.Battle} element={<Match />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </div>
  );
};
