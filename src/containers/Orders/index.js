import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import { fetchOrders } from '../../store/actions';

import { Order } from '../../components';
import { Spinner } from '../../components/shared';

class Orders extends Component {
  componentDidMount() {
    const { token, onFetchOrders } = this.props;
    onFetchOrders(token);
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

const mapStateToProps = ({ order: { orders, loading }, auth: { token } }) => ({
  orders,
  loading,
  token
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: token => dispatch(fetchOrders(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
