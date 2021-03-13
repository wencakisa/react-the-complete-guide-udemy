import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import ContactData from '../Checkout/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends Component {
  goToHomepage = () => this.props.history.push('/');
  cancelCheckout = () => this.props.history.goBack();
  continueCheckout = () => this.props.history.replace('/checkout/contact-data');

  render() {
    const {
      match: { path },
      ingredients,
      purchased
    } = this.props;

    if (!ingredients) {
      this.goToHomepage();
    }

    return (
      <div>
        {purchased && <Redirect to="/" />}
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

const mapStateToProps = ({
  burgerBuilder: { ingredients },
  order: { purchased }
}) => ({
  ingredients,
  purchased
});

export default connect(mapStateToProps)(Checkout);
