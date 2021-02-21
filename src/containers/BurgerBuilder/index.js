import React, { Component } from 'react';

import _ from 'lodash';

import axiosOrders from '../../config/axios-orders';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary';
import { Modal, Spinner } from '../../components/shared';
import { withErrorHandler } from '../../hoc';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    loadingIngredients: false,
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    sendingPurchase: false
  };

  componentDidMount() {
    this.initializeIngredients();
  }

  initializeIngredients = async () => {
    this.setState({ loadingIngredients: true });

    const response = await axiosOrders.get('/ingredients.json');

    if (response && response.status === 200) {
      this.setState({ ingredients: response.data });
    }

    this.setState({ loadingIngredients: false });
  };

  addIngredientHandler = type =>
    this.setState(
      prevState => ({
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] + 1
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
      }),
      this.updatePurchaseState
    );

  removeIngredientHandler = type => {
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

  continuePurchasingHandler = async () => {
    const { ingredients, totalPrice } = this.state;

    const order = {
      ingredients,
      totalPrice,
      customer: {
        name: 'Ventsislav Tashev',
        address: 'Casterbridge'
      }
    };

    this.setState({ sendingPurchase: true });

    const response = await axiosOrders.post('/orders.json', order);

    if (_.get(response, 'status') === 200) {
      // yeah!
    }

    this.setState({ purchasing: false, sendingPurchase: false });
  };

  render() {
    const {
      ingredients,
      loadingIngredients,
      totalPrice,
      purchasable,
      purchasing,
      sendingPurchase
    } = this.state;

    const disabledInfo = _.mapValues(ingredients, value => value <= 0);

    return (
      <>
        {loadingIngredients && <Spinner />}
        {!loadingIngredients && (
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
                {sendingPurchase ? (
                  <Spinner />
                ) : (
                  <OrderSummary
                    ingredients={ingredients}
                    totalPrice={totalPrice}
                    continuePurchasing={this.continuePurchasingHandler}
                    cancelPurchasing={this.cancelPurchasingHandler}
                  />
                )}
              </Modal>
            )}
          </>
        )}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosOrders);
