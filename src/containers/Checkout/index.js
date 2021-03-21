import React from 'react';

import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import ContactData from '../Checkout/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

const Checkout = ({ history, match: { path }, ingredients, purchased }) => {
  const goToHomepage = () => history.push('/');
  const cancelCheckout = () => history.goBack();
  const continueCheckout = () => history.replace('/checkout/contact-data');

  if (!ingredients) {
    goToHomepage();
  }

  return (
    <div>
      {purchased && <Redirect to="/" />}
      <CheckoutSummary
        ingredients={ingredients}
        onCancel={cancelCheckout}
        onContinue={continueCheckout}
      />
      <Route path={`${path}/contact-data`} component={ContactData} />
    </div>
  );
};

const mapStateToProps = ({
  burgerBuilder: { ingredients },
  order: { purchased }
}) => ({
  ingredients,
  purchased
});

export default connect(mapStateToProps)(Checkout);
