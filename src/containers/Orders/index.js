import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import { fetchOrders } from '../../store/actions';

import { Order } from '../../components';
import { Spinner } from '../../components/shared';

class Orders extends Component {
  componentDidMount() {
    const { token, userId, onFetchOrders } = this.props;
    onFetchOrders(token, userId);
  }

  render() {
    const { orders, loading } = this.props;

    return (
      <>
        {loading && <Spinner />}
        {!loading && (
          <div>
            {_.map(orders, ({ id, ...rest }) => (
              <Order key={id} {...rest} />
            ))}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({
  order: { orders, loading },
  auth: { token, userId }
}) => ({
  orders,
  loading,
  token,
  userId
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
