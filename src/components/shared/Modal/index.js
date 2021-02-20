import React from 'react';

import Backdrop from '../Backdrop';

import styles from './styles.module.css';

const Modal = ({ onClose, children }) => (
  <>
    <Backdrop show onClick={onClose} />
    <div className={styles.modal}>{children}</div>
  </>
);

export default Modal;
