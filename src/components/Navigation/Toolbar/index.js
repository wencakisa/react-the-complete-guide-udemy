import React from 'react';

import { Logo } from '../../';
import NavigationItems from '../NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';

import styles from './styles.module.css';

const Toolbar = ({ toggleSideDrawer, isAuthenticated }) => (
  <header className={styles.toolbar}>
    <DrawerToggle onClick={toggleSideDrawer} />
    <div className={styles.logo}>
      <Logo />
    </div>
    <div className={styles.desktopOnly}>
      <NavigationItems isAuthenticated={isAuthenticated} />
    </div>
  </header>
);

export default Toolbar;
