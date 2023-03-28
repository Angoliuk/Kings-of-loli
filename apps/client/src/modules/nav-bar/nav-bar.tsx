import { FC } from 'react';

import { LeftBattleMenu } from '../../../resources/svg/button-svg/left-button-battle-menu';
import { LeftLeaderboardMenu } from '../../../resources/svg/button-svg/left-button-leaderboard-menu';
import { LeftProfileMenu } from '../../../resources/svg/button-svg/left-button-profile-menu';
import { LeftSettingsMenu } from '../../../resources/svg/button-svg/left-button-settings-menu';
import { NavUserLink } from '../../components/nav-user-link/navigation-user-link';
import { RoutesEnum } from '../../routes/app-route/app-route-enums';
import styles from './nav-bar.module.css';

export const NavBar: FC = () => {
  return (
    <nav className={styles.nav}>
      <NavUserLink navLink={RoutesEnum.Home}>
        <LeftBattleMenu />
      </NavUserLink>
      <NavUserLink navLink={RoutesEnum.Profile}>
        <LeftProfileMenu />
      </NavUserLink>
      <NavUserLink navLink={RoutesEnum.Stats}>
        <LeftLeaderboardMenu />
      </NavUserLink>
      <NavUserLink navLink={RoutesEnum.Settings}>
        <LeftSettingsMenu />
      </NavUserLink>
    </nav>
  );
};
