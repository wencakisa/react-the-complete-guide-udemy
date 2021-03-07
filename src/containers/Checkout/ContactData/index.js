import React, { Component } from 'react';

import _ from 'lodash';

import axiosOrders from '../../../config/axios-orders';
import { Button, Spinner } from '../../../components/shared';

import styles from './styles.module.css';

class ContactData extends Component {
  state = {
    customer: {
      username: '',
      email: '',
      address: {
        street: '',
        postalCode: ''
      }
    },
    loading: false
  };

  orderHandler = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    const { customer } = this.state;
    const { history, ingredients, totalPrice } = this.props;

    const order = {
      ingredients,
      totalPrice,
      customer
    };

    const response = await axiosOrders.post('/orders.json', order);

    this.setState({ loading: false });

    if (_.get(response, 'status') === 200) {
      history.push('/');
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <div className={styles.contactData}>
        {loading && <Spinner />}
        {!loading && (
          <React.Fragment>
            <h4>Enter your contact data:</h4>
            <form>
              <input type="text" name="name" placeholder="Your name" />
              <input type="email" name="email" placeholder="Your email" />
              <input type="text" name="street" placeholder="Street" />
              <input type="text" name="postalCode" placeholder="Postal code" />
              <Button type="success" onClick={this.orderHandler}>
                Order
              </Button>
            </form>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ContactData;
