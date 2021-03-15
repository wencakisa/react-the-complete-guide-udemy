import React from 'react';

import classnames from 'classnames';

import Logo from '../../Logo';
import { Backdrop } from '../../shared';
import NavigationItems from '../NavigationItems';

import styles from './styles.module.css';

const SideDrawer = ({ open, close, isAuthenticated }) => {
  return (
    <>
      <div
        className={classnames(styles.sideDrawer, {
          [styles.open]: open,
          [styles.close]: !open
        })}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavigationItems isAuthenticated={isAuthenticated} />
      </div>
      <Backdrop show={open} onClick={close} />
    </>
  );
};

export default SideDrawer;
