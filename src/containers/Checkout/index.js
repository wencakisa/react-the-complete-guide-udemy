import React, { Component } from 'react';

import _ from 'lodash';
import { Route } from 'react-router-dom';

import ContactData from '../Checkout/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentDidMount() {
    const { ingredients, totalPrice } = this.extractQueryParams();
    this.setState({ ingredients, totalPrice });
  }

  getQueryParams = () => {
    const {
      location: { search }
    } = this.props;

    const queryParams = new URLSearchParams(search);

    return queryParams;
  };

  extractQueryParams = () => {
    const queryParams = this.getQueryParams();

    const ingredients = {};
    let totalPrice = null;

    for (let [name, value] of queryParams.entries()) {
      if (name === 'price') {
        totalPrice = value;
      } else {
        ingredients[name] = _.toNumber(value);
      }
    }

    return { ingredients, totalPrice };
  };

  cancelCheckout = () => this.props.history.goBack();
  continueCheckout = () => this.props.history.replace('/checkout/contact-data');

  render() {
    const {
      match: { path }
    } = this.props;

    const { ingredients, totalPrice } = this.state;

    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          onCancel={this.cancelCheckout}
          onContinue={this.continueCheckout}
        />
        <Route
          path={`${path}/contact-data`}
          render={props => (
            <ContactData
              ingredients={ingredients}
              totalPrice={totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
