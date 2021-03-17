import _ from 'lodash';
import { put } from 'redux-saga/effects';

import axiosOrders from '../../config/axios-orders';
import { transformObjectToQueryParams } from '../../utils';

import {
  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail
} from '../actions';

export function* purchaseBurgerSaga({ orderData, token }) {
  yield put(purchaseBurgerStart());

  try {
    const {
      data: { name }
    } = yield axiosOrders.post(`/orders.json?auth=${token}`, orderData);
    yield put(purchaseBurgerSuccess(name, orderData));
  } catch (error) {
    yield put(purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga({ token, userId }) {
  yield put(fetchOrdersStart());

  try {
    const queryParams = {
      auth: token,
      orderBy: 'userId',
      equalTo: userId
    };
    const queryParamsString = transformObjectToQueryParams(queryParams);

    const response = yield axiosOrders.get(`/orders.json?${queryParamsString}`);
    const orders = _.map(response.data, (values, id) => ({ id, ...values }));
    yield put(fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(fetchOrdersFail(error));
  }
}
