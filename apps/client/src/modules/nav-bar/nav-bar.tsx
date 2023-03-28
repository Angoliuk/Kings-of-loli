import { FC } from 'react';

import { LeftBattleMenu } from '../../../resources/svg/button-svg/left-button-battle-menu';
import { LeftLeaderboardMenu } from '../../../resources/svg/button-svg/left-button-leaderboard-menu';
import { LeftProfileMenu } from '../../../resources/svg/button-svg/left-button-profile-menu';
import { LeftSettingsMenu } from '../../../resources/svg/button-svg/left-button-settings-menu';
import { NavButton } from '../../components/nav-button/nav-button';
import { RoutesEnum } from '../../routes/app-route/app-route-enums';
import styles from './nav-bar.module.css';

export const NavBar: FC = () => {
  return (
    <nav className={styles.nav}>
      <NavButton link={RoutesEnum.Home} className={styles.navButtons}>
        <LeftBattleMenu />
      </NavButton>
      <NavButton link={RoutesEnum.Profile} className={styles.navButtons}>
        <LeftProfileMenu />
      </NavButton>
      <NavButton link={RoutesEnum.Stats} className={styles.navButtons}>
        <LeftLeaderboardMenu />
      </NavButton>
      <NavButton link={RoutesEnum.Settings} className={styles.navButtons}>
        <LeftSettingsMenu />
      </NavButton>
    </nav>
  );
};
