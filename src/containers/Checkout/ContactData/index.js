import React, { useState } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import { checkInputValidity } from '../../../utils';
import { purchaseBurger } from '../../../store/actions';
import { Button, Spinner, Input } from '../../../components/shared';

import styles from './styles.module.css';

const DELIVERY_OPTIONS = {
  FASTEST: {
    value: 'fastest',
    displayValue: 'Fastest'
  },
  CHEAPEST: {
    value: 'cheapest',
    displayValue: 'Cheapest'
  }
};

const ContactData = ({
  ingredients,
  totalPrice,
  token,
  userId,
  onOrderHandler,
  loading
}) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name'
      },
      value: '',
      isValid: false,
      validation: {
        required: true
      },
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your email'
      },
      value: '',
      isValid: false,
      validation: {
        required: true,
        isEmail: true
      },
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      isValid: false,
      validation: {
        required: true
      },
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP code'
      },
      value: '',
      isValid: false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: _.values(DELIVERY_OPTIONS)
      },
      value: DELIVERY_OPTIONS.FASTEST.value,
      isValid: true,
      validation: {},
      touched: true
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();

    const formData = _.reduce(
      orderForm,
      (result, { value }, fieldName) => {
        result[fieldName] = value;
        return result;
      },
      {}
    );

    const orderData = {
      ingredients,
      totalPrice,
      formData,
      userId
    };

    onOrderHandler(orderData, token);
  };

  const onInputChange = (event, fieldName) => {
    const { value } = event.target;

    const fieldIsValid = checkInputValidity(
      value,
      orderForm[fieldName].validation
    );

    const updatedOrderForm = {
      ...orderForm,
      [fieldName]: {
        ...orderForm[fieldName],
        value,
        touched: true,
        isValid: fieldIsValid
      }
    };

    setOrderForm(updatedOrderForm);
    setFormIsValid(_.every(updatedOrderForm, 'isValid'));
  };

  return (
    <div className={styles.contactData}>
      {loading && <Spinner />}
      {!loading && (
        <React.Fragment>
          <h4>Enter your contact data:</h4>
          <form onSubmit={orderHandler}>
            {_.map(orderForm, ({ validation, ...inputProps }, fieldName) => (
              <Input
                key={fieldName}
                shouldValidate={!_.isNil(validation)}
                onChange={event => onInputChange(event, fieldName)}
                {...inputProps}
              />
            ))}

            <Button type="success" disabled={!formIsValid}>
              Order
            </Button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = ({
  burgerBuilder: { ingredients, totalPrice },
  order: { loading },
  auth: { token, userId }
}) => ({
  ingredients,
  totalPrice,
  loading,
  token,
  userId
});

const mapDispatchToProps = dispatch => ({
  onOrderHandler: (orderData, token) =>
    dispatch(purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
