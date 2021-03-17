import { put } from 'redux-saga/effects';

import axiosOrders from '../../config/axios-orders';
import { setIngredients, fetchIngredientsFailed } from '../actions';

export function* initIngredientsSaga() {
  try {
    const response = yield axiosOrders.get('/ingredients.json');
    yield put(setIngredients(response.data));
  } catch (error) {
    yield put(fetchIngredientsFailed());
  }
}
