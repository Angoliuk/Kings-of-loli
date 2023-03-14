import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { LeftBattleMenu } from '../../svg/button-svg/left-button-battle-menu';
import { LeftLeaderboardMenu } from '../../svg/button-svg/left-button-leaderboard-menu';
import { LeftProfileMenu } from '../../svg/button-svg/left-button-profile-menu';
import { LeftSettingsMenu } from '../../svg/button-svg/left-button-settings-menu';
import styles from './nav-bar.module.css';

export const NavBar: FC = () => {
  return (
    <nav className={styles.nav}>
      <NavLink className={`${styles.navButtons} ${styles.mainMenu}`} to="/">
        <LeftBattleMenu />
      </NavLink>
      <NavLink className={`${styles.navButtons} ${styles.userAccount}`} to="/about">
        <LeftProfileMenu />
      </NavLink>
      <NavLink className={`${styles.navButtons} ${styles.stats}`} to="/stats">
        <LeftLeaderboardMenu />
      </NavLink>
      <NavLink className={`${styles.navButtons} ${styles.settings}`} to="/settings">
        <LeftSettingsMenu />
      </NavLink>
    </nav>
  );
};
