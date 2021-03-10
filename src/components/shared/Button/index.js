import React from 'react';

import classnames from 'classnames';

import styles from './styles.module.css';

const Button = ({ type, onClick, disabled = false, children }) => (
  <button
    className={classnames(styles.button, styles[type])}
    onClick={onClick}
    disabled={disabled}>
    {children}
  </button>
);

export default Button;
