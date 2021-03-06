import React, { Component } from 'react';

import _ from 'lodash';
import { Route } from 'react-router-dom';

import ContactData from '../Checkout/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: null
  };

  componentDidMount() {
    const ingredients = this.extractIngredientsFromQueryParams();
    this.setState({ ingredients });
  }

  extractIngredientsFromQueryParams = () => {
    const {
      location: { search }
    } = this.props;

    const queryParams = new URLSearchParams(search);
    const ingredients = {};

    for (let [name, value] of queryParams.entries()) {
      ingredients[name] = _.toNumber(value);
    }

    return ingredients;
  };

  cancelCheckout = () => this.props.history.goBack();
  continueCheckout = () => this.props.history.replace('/checkout/contact-data');

  render() {
    const {
      match: { path }
    } = this.props;

    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCancel={this.cancelCheckout}
          onContinue={this.continueCheckout}
        />
        <Route path={`${path}/contact-data`} component={ContactData} />
      </div>
    );
  }
}

export default Checkout;
