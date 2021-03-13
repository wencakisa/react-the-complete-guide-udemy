import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import { fetchOrders } from '../../store/actions';

import { Order } from '../../components';
import { Spinner } from '../../components/shared';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
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

const mapStateToProps = ({ order: { orders, loading } }) => ({
  orders,
  loading
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
