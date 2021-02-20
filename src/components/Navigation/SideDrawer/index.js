import React from 'react';

import cx from 'classnames';

import Logo from '../../Logo';
import { Backdrop } from '../../shared';
import NavigationItems from '../NavigationItems';

import styles from './styles.module.css';

const SideDrawer = ({ open, close }) => {
  return (
    <>
      <div
        className={cx(styles.sideDrawer, {
          [styles.open]: open,
          [styles.close]: !open
        })}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavigationItems />
      </div>
      <Backdrop show={open} onClick={close} />
    </>
  );
};

export default SideDrawer;
