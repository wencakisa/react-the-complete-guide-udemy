import React from 'react';

import cx from 'classnames';

import styles from './styles.module.css';

const Button = ({ type, onClick, children }) => (
  <button className={cx(styles.button, styles[type])} onClick={onClick}>
    {children}
  </button>
);

export default Button;
