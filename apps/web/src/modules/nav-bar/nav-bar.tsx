import { type FC } from 'react';

import { LeftBattleMenu } from '../../../resources/svg/button-svg/left-button-battle-menu';
import { NavButton } from '../../components/nav-button/nav-button';
import { AppRoutes } from '../../routes/app-router-enum';
import styles from './nav-bar.module.css';

export const NavBar: FC = () => {
  return (
    <nav className={styles.nav}>
      <NavButton link={AppRoutes.Home} className={[styles.navButtons]}>
        <LeftBattleMenu />
      </NavButton>
      <NavButton link={AppRoutes.Profile} className={[styles.navButtons, styles.profileButton]}></NavButton>
      <NavButton link={AppRoutes.Stats} className={[styles.leaderboardButton, styles.navButtons]}></NavButton>
      <NavButton link={AppRoutes.Settings} className={[styles.settingsButton, styles.navButtons]}></NavButton>
    </nav>
  );
};
