import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import * as actionTypes from '../../store/actions';
// import axiosOrders from '../../config/axios-orders';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary';
import { Modal, Spinner } from '../../components/shared';

class BurgerBuilder extends Component {
  state = {
    loadingIngredients: false,
    purchasing: false,
    sendingPurchase: false
  };

  // componentDidMount() {
  //   this.initializeIngredients();
  // }

  // initializeIngredients = async () => {
  //   this.setState({ loadingIngredients: true });

  //   const response = await axiosOrders.get('/ingredients.json');

  //   if (response && response.status === 200) {
  //     this.setState({ ingredients: response.data });
  //   }

  //   this.setState({ loadingIngredients: false });
  // };

  startPurchasingHandler = () => this.setState({ purchasing: true });
  cancelPurchasingHandler = () => this.setState({ purchasing: false });

  goToCheckout = () => this.props.history.push('/checkout');

  render() {
    const { loadingIngredients, purchasing, sendingPurchase } = this.state;

    const {
      ingredients,
      totalPrice,
      addIngredientHandler,
      removeIngredientHandler
    } = this.props;

    const disabledInfo = _.mapValues(ingredients, value => value <= 0);
    const purchasable = _.sum(_.values(ingredients)) > 0;

    return (
      <>
        {loadingIngredients && <Spinner />}
        {!loadingIngredients && (
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
                {sendingPurchase ? (
                  <Spinner />
                ) : (
                  <OrderSummary
                    ingredients={ingredients}
                    totalPrice={totalPrice}
                    continuePurchasing={this.goToCheckout}
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

const mapStateToProps = ({ ingredients, totalPrice }) => ({
  ingredients,
  totalPrice
});

const mapDispatchToProps = dispatch => ({
  addIngredientHandler: ingredientName =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
  removeIngredientHandler: ingredientName =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
