import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit
} from '../../store/actions';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary';
import { Modal, Spinner } from '../../components/shared';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.initIngredientsHandler();
  }

  startPurchasingHandler = () => this.setState({ purchasing: true });
  cancelPurchasingHandler = () => this.setState({ purchasing: false });

  goToCheckout = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const { purchasing } = this.state;

    const {
      ingredients,
      totalPrice,
      error,
      addIngredientHandler,
      removeIngredientHandler
    } = this.props;

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
              purchase={this.startPurchasingHandler}
            />
            {purchasing && (
              <Modal onClose={this.cancelPurchasingHandler}>
                <OrderSummary
                  ingredients={ingredients}
                  totalPrice={totalPrice}
                  continuePurchasing={this.goToCheckout}
                  cancelPurchasing={this.cancelPurchasingHandler}
                />
              </Modal>
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = ({
  burgerBuilder: { ingredients, totalPrice, error }
}) => ({
  ingredients,
  totalPrice,
  error
});

const mapDispatchToProps = dispatch => ({
  addIngredientHandler: ingredientName =>
    dispatch(addIngredient(ingredientName)),
  removeIngredientHandler: ingredientName =>
    dispatch(removeIngredient(ingredientName)),
  initIngredientsHandler: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
