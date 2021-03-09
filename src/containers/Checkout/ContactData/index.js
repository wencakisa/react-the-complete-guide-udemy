import React, { Component } from 'react';

import _ from 'lodash';

import axiosOrders from '../../../config/axios-orders';
import { Button, Spinner, Input } from '../../../components/shared';

import styles from './styles.module.css';

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
          type: 'text',
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
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        isValid: false,
        touched: false
      }
    },
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

  onInputChange = (event, fieldName) => {
    const { value } = event.target;

    this.setState(prevState => ({
      orderForm: {
        ...prevState.orderForm,
        [fieldName]: {
          ...prevState.orderForm[fieldName],
          touched: true,
          value: event.target.value,
          isValid: this.checkInputValidity(
            value,
            prevState.orderForm[fieldName].validation
          )
        }
      }
    }));
  };

  render() {
    const { orderForm, loading } = this.state;

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

              <Button type="success">Order</Button>
            </form>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ContactData;
