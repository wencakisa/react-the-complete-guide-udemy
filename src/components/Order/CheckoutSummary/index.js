import React from 'react';

import Burger from '../../Burger';
import Button from '../../shared/Button';

import styles from './styles.module.css';

const CheckoutSummary = ({ ingredients, onCancel, onContinue }) => (
  <div className={styles.summary}>
    <h1>We hope it tastes well!</h1>
    <div className={styles.burgerWrapper}>
      <Burger ingredients={ingredients} />
    </div>
    <Button type="danger" onClick={onCancel}>
      CANCEL
    </Button>
    <Button type="success" onClick={onContinue}>
      CONTINUE
    </Button>
  </div>
);

export default CheckoutSummary;
