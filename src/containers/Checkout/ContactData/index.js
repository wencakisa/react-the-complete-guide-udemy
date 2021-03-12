import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import axiosOrders from '../../../config/axios-orders';
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

class ContactData extends Component {
  state = {
    orderForm: {
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
          required: true
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
          maxLength: 5
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
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    const { orderForm } = this.state;
    const { history, ingredients, totalPrice } = this.props;

    const formData = _.reduce(
      orderForm,
      (result, { value }, fieldName) => {
        result[fieldName] = value;
        return result;
      },
      {}
    );

    const order = {
      ingredients,
      totalPrice,
      formData
    };

    const response = await axiosOrders.post('/orders.json', order);

    this.setState({ loading: false });

    if (_.get(response, 'status') === 200) {
      history.push('/');
    }
  };

  checkInputValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = !_.isEmpty(value) && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  setOverallFormValidity = () =>
    this.setState(prevState => ({
      formIsValid: _.every(prevState.orderForm, 'isValid')
    }));

  onInputChange = (event, fieldName) => {
    const { value } = event.target;

    this.setState(prevState => {
      const fieldIsValid = this.checkInputValidity(
        value,
        prevState.orderForm[fieldName].validation
      );

      return {
        orderForm: {
          ...prevState.orderForm,
          [fieldName]: {
            ...prevState.orderForm[fieldName],
            value,
            touched: true,
            isValid: fieldIsValid
          }
        }
      };
    }, this.setOverallFormValidity);
  };

  render() {
    const { orderForm, formIsValid, loading } = this.state;

    return (
      <div className={styles.contactData}>
        {loading && <Spinner />}
        {!loading && (
          <React.Fragment>
            <h4>Enter your contact data:</h4>
            <form onSubmit={this.orderHandler}>
              {_.map(orderForm, ({ validation, ...inputProps }, fieldName) => (
                <Input
                  key={fieldName}
                  shouldValidate={!_.isNil(validation)}
                  onChange={event => this.onInputChange(event, fieldName)}
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
  }
}

const mapStateToProps = ({ ingredients, totalPrice }) => ({
  ingredients,
  totalPrice
});

export default connect(mapStateToProps)(ContactData);
