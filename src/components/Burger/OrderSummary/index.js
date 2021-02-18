import React from 'react';

import _ from 'lodash';

import { Button } from '../../shared';

export const OrderSummary = ({
  ingredients,
  totalPrice,
  continuePurchasing,
  cancelPurchasing
}) => {
  const ingredientsSummary = _.map(ingredients, (count, ingredient) => (
    <li key={ingredient}>
      <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>: {count}
    </li>
  ));

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total price: {totalPrice.toFixed(2)}$</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button type="danger" onClick={cancelPurchasing}>
        CANCEL
      </Button>
      <Button type="success" onClick={continuePurchasing}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
};

export default OrderSummary;
