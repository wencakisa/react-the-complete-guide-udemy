import React, { Component } from 'react';
import _ from 'lodash';

import axiosOrders from '../../config/axios-orders';
import { Order } from '../../components';

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  };

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    this.setState({ loading: true });

    const response = await axiosOrders.get('/orders.json');

    if (response && response.status === 200) {
      const orders = _.map(response.data, (values, id) => ({ id, ...values }));
      this.setState({ orders });
    }

    this.setState({ loading: false });
  };

  render() {
    const { orders } = this.state;

    return (
      <div>
        {_.map(orders, ({ id, ...rest }) => (
          <Order key={id} {...rest} />
        ))}
      </div>
    );
  }
}

export default Orders;
