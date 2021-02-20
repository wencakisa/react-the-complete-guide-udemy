import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';

import styles from './styles.module.css';

const Logo = () => (
  <div className={styles.logo}>
    <img src={burgerLogo} alt="Burger" />
  </div>
);

export default Logo;
