import * as actionTypes from './actionTypes';
import axiosOrders from '../../config/axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId,
  orderData
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = orderData => {
  return async dispatch => {
    dispatch(purchaseBurgerStart());

    try {
      const response = await axiosOrders.post('/orders.json', orderData);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });
