import React, { useEffect } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import { fetchOrders } from '../../store/actions';

import { Order } from '../../components';
import { Spinner } from '../../components/shared';

const Orders = ({ token, userId, onFetchOrders, orders, loading }) => {
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

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
};

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
