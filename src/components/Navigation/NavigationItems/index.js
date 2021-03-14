import React from 'react';

import NavigationItem from './NavigationItem';
import styles from './styles.module.css';

const NavigationItems = () => (
  <div className={styles.navigationItems}>
    <nav>
      <ul>
        <NavigationItem exact link="/">
          Burger Builder
        </NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      </ul>
    </nav>
  </div>
);

export default NavigationItems;
