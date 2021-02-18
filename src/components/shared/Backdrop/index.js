import React from 'react';

import styles from './styles.module.css';

const Backdrop = ({ onClick }) => (
  <div className={styles.backdrop} onClick={onClick}></div>
);

export default Backdrop;
