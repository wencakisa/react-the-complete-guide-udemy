import React from 'react';

import styles from './styles.module.css';

const BuildControl = ({
  label,
  type,
  addIngredient,
  removeIngredient,
  disabled
}) => (
  <div className={styles.buildControl}>
    <div className={styles.label}>{label}</div>

    <button
      className={styles.less}
      onClick={() => removeIngredient(type)}
      disabled={disabled}>
      Less
    </button>
    <button className={styles.more} onClick={() => addIngredient(type)}>
      More
    </button>
  </div>
);

export default BuildControl;
