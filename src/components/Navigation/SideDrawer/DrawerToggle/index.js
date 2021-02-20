import React from 'react';

import styles from './styles.module.css';

const DrawerToggle = ({ onClick }) => (
  <div className={styles.drawerToggle} onClick={onClick}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default DrawerToggle;
