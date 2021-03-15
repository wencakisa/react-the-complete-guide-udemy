import React from 'react';

import NavigationItem from './NavigationItem';
import styles from './styles.module.css';

const NavigationItems = ({ isAuthenticated }) => (
  <div className={styles.navigationItems}>
    <nav>
      <ul>
        <NavigationItem exact link="/">
          Burger Builder
        </NavigationItem>
        {isAuthenticated && (
          <NavigationItem link="/orders">Orders</NavigationItem>
        )}
        {isAuthenticated ? (
          <NavigationItem link="/logout">Logout</NavigationItem>
        ) : (
          <NavigationItem link="/auth">Authenticate</NavigationItem>
        )}
      </ul>
    </nav>
  </div>
);

export default NavigationItems;
