import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

const STARTING_PRICE = 5;

const initialState = {
  ingredients: null,
  totalPrice: STARTING_PRICE,
  error: false,
  building: false
};

const addIngredient = (state, { ingredientName }) => ({
  ...state,
  ingredients: {
    ...state.ingredients,
    [ingredientName]: state.ingredients[ingredientName] + 1
  },
  totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
  building: true
});

const removeIngredient = (state, { ingredientName }) => ({
  ...state,
  ingredients: {
    ...state.ingredients,
    [ingredientName]: state.ingredients[ingredientName] - 1
  },
  totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName],
  building: true
});

const setIngredients = (state, { ingredients }) => ({
  ...state,
  ingredients: {
    salad: ingredients.salad,
    bacon: ingredients.bacon,
    cheese: ingredients.cheese,
    meat: ingredients.meat
  },
  totalPrice: STARTING_PRICE,
  error: false,
  building: false
});

const fetchIngredientsFailed = (state, action) => ({ ...state, error: true });

const reducer = (state = initialState, action) => {
  const mapping = {
    [actionTypes.ADD_INGREDIENT]: addIngredient,
    [actionTypes.REMOVE_INGREDIENT]: removeIngredient,
    [actionTypes.SET_INGREDIENTS]: setIngredients,
    [actionTypes.FETCH_INGREDIENTS_FAILED]: fetchIngredientsFailed
  };

  const method = mapping[action.type];

  if (!method) {
    return state;
  }

  return method(state, action);
};

export default reducer;
