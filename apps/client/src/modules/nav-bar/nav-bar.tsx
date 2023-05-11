import { FC } from 'react';

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
      <NavButton
        link={AppRoutes.Profile}
        className={[styles.navButtons, styles.profileButton]}
        src="../../../resources/img/menu/left-menu-profile-icon.png"
        alt="profile"
      />

      <NavButton
        link={AppRoutes.Stats}
        className={[styles.leaderboardButton, styles.navButtons]}
        src="../../../resources/img/menu/left-menu-leaderboard-icon.png"
        alt="leaderboard"
      />

      <NavButton
        link={AppRoutes.Settings}
        className={[styles.settingsButton, styles.navButtons]}
        src="../../../resources/img/menu/left-menu-settings-icon.png"
        alt="settings"
      />
    </nav>
  );
};
