import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from '../../modules/home-page/home-page';
import { LogIn } from '../../modules/log-in-page/log-in-page';
import { ProfilePage } from '../../modules/profile-page/profile-page';
import { SettingsPage } from '../../modules/settings-page/settings-page';
import { SignIn } from '../../modules/sign-in-page/sign-in-page';
import { StatsPage } from '../../modules/stats-page/stats-page';
import styles from './app-route.module.css';
import { RoutesEnum } from './app-route-enums';

export const AppRoute: FC = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path={RoutesEnum.SignIn} element={<SignIn />} />
          <Route path={RoutesEnum.LogIn} element={<LogIn />} />
          <Route path={RoutesEnum.Home} element={<HomePage />} />
          <Route path="/" element={<Navigate to={RoutesEnum.Home} />} />
          <Route path={RoutesEnum.Profile} element={<ProfilePage />} />
          <Route path={RoutesEnum.Stats} element={<StatsPage />} />
          <Route path={RoutesEnum.Settings} element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};