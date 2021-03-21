import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

const BurgerBuilder = ({ history }) => {
  const [purchasing, setPurchasing] = useState(false);

  const ingredients = useSelector(
    ({ burgerBuilder: { ingredients } }) => ingredients
  );
  const totalPrice = useSelector(
    ({ burgerBuilder: { totalPrice } }) => totalPrice
  );
  const error = useSelector(({ burgerBuilder: { error } }) => error);

  const isAuthenticated = useSelector(
    ({ auth: { token } }) => !_.isNull(token)
  );

  const dispatch = useDispatch();

  const addIngredientHandler = ingredientName =>
    dispatch(addIngredient(ingredientName));

  const removeIngredientHandler = ingredientName =>
    dispatch(removeIngredient(ingredientName));

  const onInitPurchase = () => dispatch(purchaseInit());

  const onSetAuthRedirectPath = path => dispatch(setAuthRedirectPath(path));

  useEffect(() => {
    dispatch(initIngredients());
  }, [dispatch]);

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

export default BurgerBuilder;
