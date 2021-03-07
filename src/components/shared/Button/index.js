import React from 'react';

import classnames from 'classnames';

import styles from './styles.module.css';

const Button = ({ type, onClick, children }) => (
  <button className={classnames(styles.button, styles[type])} onClick={onClick}>
    {children}
  </button>
);

export default Button;
