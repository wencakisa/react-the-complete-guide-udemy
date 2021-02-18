import React from 'react';

import BuildControl from './BuildControl';
import styles from './styles.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = ({
  addIngredient,
  removeIngredient,
  disabledInfo,
  price,
  purchasable,
  purchase
}) => {
  return (
    <div className={styles.buildControls}>
      <p>
        Current price: <strong>{price.toFixed(2)}$</strong>
      </p>
      {controls.map((control, index) => (
        <BuildControl
          key={index}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          disabled={disabledInfo[control.type]}
          {...control}
        />
      ))}
      <button
        className={styles.orderButton}
        disabled={!purchasable}
        onClick={purchase}>
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
