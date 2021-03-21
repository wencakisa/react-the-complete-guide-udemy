import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
  setAuthRedirectPath
} from '../../store/actions';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary';
import { Modal, Spinner } from '../../components/shared';

const BurgerBuilder = ({
  history,
  ingredients,
  totalPrice,
  error,
  isAuthenticated,
  initIngredientsHandler,
  addIngredientHandler,
  removeIngredientHandler,
  onInitPurchase,
  onSetAuthRedirectPath
}) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    initIngredientsHandler();
  }, [initIngredientsHandler]);

  const startPurchasingHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  };

  const cancelPurchasingHandler = () => setPurchasing(false);

  const goToCheckout = () => {
    onInitPurchase();
    history.push('/checkout');
  };

  const disabledInfo = _.mapValues(ingredients, value => value <= 0);
  const purchasable = _.sum(_.values(ingredients)) > 0;

  return (
    <>
      {!ingredients && (
        <>
          {!error && <Spinner />}
          {error && <p>Ingredients cannot be fetched :(</p>}
        </>
      )}
      {ingredients && (
        <>
          <Burger ingredients={ingredients} />
          <BuildControls
            addIngredient={addIngredientHandler}
            removeIngredient={removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={totalPrice}
            purchasable={purchasable}
            purchase={startPurchasingHandler}
            isAuthenticated={isAuthenticated}
          />
          {purchasing && (
            <Modal onClose={cancelPurchasingHandler}>
              <OrderSummary
                ingredients={ingredients}
                totalPrice={totalPrice}
                continuePurchasing={goToCheckout}
                cancelPurchasing={cancelPurchasingHandler}
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = ({
  burgerBuilder: { ingredients, totalPrice, error },
  auth: { token }
}) => ({
  ingredients,
  totalPrice,
  error,
  isAuthenticated: !_.isNull(token)
});

const mapDispatchToProps = dispatch => ({
  addIngredientHandler: ingredientName =>
    dispatch(addIngredient(ingredientName)),
  removeIngredientHandler: ingredientName =>
    dispatch(removeIngredient(ingredientName)),
  initIngredientsHandler: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
