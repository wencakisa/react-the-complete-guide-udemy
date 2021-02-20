import React from 'react';

import NavigationItem from './NavigationItem';
import styles from './styles.module.css';

const NavigationItems = () => (
  <div className={styles.navigationItems}>
    <nav>
      <ul>
        <NavigationItem active link="/">
          Burger Builder
        </NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
      </ul>
    </nav>
  </div>
);

export default NavigationItems;
