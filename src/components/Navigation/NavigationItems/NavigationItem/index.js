import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from './styles.module.css';

const NavigationItem = ({ link, exact, children }) => (
  <li className={styles.navigationItem}>
    <NavLink exact={exact} to={link} activeClassName={styles.active}>
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
