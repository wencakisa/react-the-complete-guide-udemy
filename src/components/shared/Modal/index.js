import React from 'react';

import Backdrop from '../Backdrop';

import styles from './styles.module.css';

const Modal = ({ onClose, children }) => (
  <>
    <Backdrop onClick={onClose} />
    <div className={styles.modal}>{children}</div>
  </>
);

export default Modal;
