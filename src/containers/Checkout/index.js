import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import ContactData from '../Checkout/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends Component {
  cancelCheckout = () => this.props.history.goBack();
  continueCheckout = () => this.props.history.replace('/checkout/contact-data');

  render() {
    const {
      match: { path },
      ingredients
    } = this.props;

    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          onCancel={this.cancelCheckout}
          onContinue={this.continueCheckout}
        />
        <Route path={`${path}/contact-data`} component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = ({ ingredients }) => ({
  ingredients
});

export default connect(mapStateToProps)(Checkout);
