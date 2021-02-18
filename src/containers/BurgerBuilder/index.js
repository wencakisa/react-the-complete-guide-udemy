import React, { Component } from 'react';

import _ from 'lodash';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary';
import { Modal } from '../../components/shared';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5,
    purchasable: false,
    purchasing: false
  };

  addIngredientHandler = (type) =>
    this.setState(
      (prevState) => ({
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] + 1
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
      }),
      this.updatePurchaseState
    );

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    let newCount = oldCount - 1;

    if (newCount >= 0) {
      const ingredients = {
        ...this.state.ingredients,
        [type]: newCount
      };

      const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

      this.setState({ ingredients, totalPrice }, this.updatePurchaseState);
    }
  };

  updatePurchaseState = () => {
    const totalIngredientsCount = _.sum(_.values(this.state.ingredients));

    this.setState({ purchasable: totalIngredientsCount > 0 });
  };

  startPurchasingHandler = () => this.setState({ purchasing: true });
  cancelPurchasingHandler = () => this.setState({ purchasing: false });

  continuePurchasingHandler = () => alert('You continue!');

  render() {
    const { ingredients, totalPrice, purchasable, purchasing } = this.state;

    const disabledInfo = _.mapValues(ingredients, (value) => value <= 0);

    return (
      <>
        <Burger ingredients={ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={totalPrice}
          purchasable={purchasable}
          purchase={this.startPurchasingHandler}
        />
        {purchasing && (
          <Modal onClose={this.cancelPurchasingHandler}>
            <OrderSummary
              ingredients={ingredients}
              continuePurchasing={this.continuePurchasingHandler}
              cancelPurchasing={this.cancelPurchasingHandler}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default BurgerBuilder;
