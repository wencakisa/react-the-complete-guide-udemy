import React from 'react';

import _ from 'lodash';

import styles from './styles.module.css';

const Order = ({ ingredients, totalPrice }) => {
  const ingredientsRepresentation = _.join(
    _.map(
      ingredients,
      (count, ingredient) => `${_.capitalize(ingredient)} (${count})`
    ),
    ', '
  );

  return (
    <div className={styles.order}>
      <p>Ingredients: {ingredientsRepresentation}</p>
      <p>
        Price: <strong>{_.toNumber(totalPrice).toFixed(2)}$</strong>
      </p>
    </div>
  );
};

export default Order;
