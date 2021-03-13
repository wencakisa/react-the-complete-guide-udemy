import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => ({ ...state, purchased: false });

const purchaseBurgerStart = (state, action) => ({ ...state, loading: false });

const purchaseBurgerSuccess = ({ state, action: { orderId, orderData } }) => {
  const newOrder = {
    id: orderId,
    ...orderData
  };
  return {
    ...state,
    loading: false,
    purchased: true,
    orders: [...state.orders, newOrder]
  };
};

const purchaseBurgerFail = (state, action) => ({ ...state, loading: false });

const fetchOrdersStart = (state, action) => ({ ...state, loading: true });

const fetchOrdersSuccess = (state, { orders }) => ({
  ...state,
  loading: false,
  orders
});

const fetchOrdersFail = (state, action) => ({ ...state, loading: false });

const reducer = (state = initialState, action) => {
  const mapping = {
    [actionTypes.PURCHASE_INIT]: purchaseInit,
    [actionTypes.PURCHASE_BURGER_START]: purchaseBurgerStart,
    [actionTypes.PURCHASE_BURGER_SUCCESS]: purchaseBurgerSuccess,
    [actionTypes.PURCHASE_BURGER_FAIL]: purchaseBurgerFail,
    [actionTypes.FETCH_ORDERS_START]: fetchOrdersStart,
    [actionTypes.FETCH_ORDERS_SUCCESS]: fetchOrdersSuccess,
    [actionTypes.FETCH_ORDERS_FAIL]: fetchOrdersFail
  };

  const method = mapping[action.type];

  if (!method) {
    return state;
  }

  return method(state, action);
};

export default reducer;
