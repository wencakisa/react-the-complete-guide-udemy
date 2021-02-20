import React from 'react';

import cx from 'classnames';

import styles from './styles.module.css';

const NavigationItem = ({ link, active, children }) => (
  <li className={styles.navigationItem}>
    <a href={link} className={cx({ [styles.active]: active })}>
      {children}
    </a>
  </li>
);

export default NavigationItem;
