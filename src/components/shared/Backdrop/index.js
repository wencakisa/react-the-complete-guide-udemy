import React from 'react';

import styles from './styles.module.css';

const Backdrop = ({ show, onClick }) => (
  <>{show && <div className={styles.backdrop} onClick={onClick}></div>}</>
);

export default Backdrop;
