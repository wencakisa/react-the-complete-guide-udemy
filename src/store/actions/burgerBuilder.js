import * as actionTypes from './actionTypes';
import axiosOrders from '../../config/axios-orders';

export const addIngredient = ingredientName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName
});

export const removeIngredient = ingredientName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => {
  return async dispatch => {
    try {
      const response = await axiosOrders.get('/ingredients.json');
      dispatch(setIngredients(response.data));
    } catch (error) {
      dispatch(fetchIngredientsFailed());
    }
  };
};
