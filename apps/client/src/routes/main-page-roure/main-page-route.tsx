/* eslint-disable unicorn/filename-case */
import { VFC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GuardedPages } from '../../components/guraded-routes/guarded-pages';
import { HomePage } from '../../modules/home-page/home-page';
import { LogIn } from '../../modules/log-in/log-in';
import { ProfilePage } from '../../modules/profile-page/profile-page';
import { SettingsPage } from '../../modules/settings-page/settings-page';
import { SignIn } from '../../modules/sign-in/sign-in';
import { StatsPage } from '../../modules/stats-page/stats-page';
import { useAuthStore } from '../../store/auth-store/auth-store';

export const MainPageRoute: VFC = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuardedPages isAllowed={isAuth} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<ProfilePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/SignUp" element={<SignIn />} />
        <Route path="/LogIn" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};
