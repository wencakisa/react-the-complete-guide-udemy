import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const authStart = (state, action) => ({ ...state, error: null, loading: true });

const authSuccess = (state, { authData: { token, userId } }) => ({
  ...state,
  token,
  userId,
  error: null,
  loading: false
});

const authFail = (state, { error }) => ({
  ...state,
  error,
  loading: false
});

const authLogout = (state, action) => ({ ...state, token: null, userId: null });

const setAuthRedirectPath = (state, { authRedirectPath }) => ({
  ...state,
  authRedirectPath
});

const reducer = (state = initialState, action) => {
  const mapping = {
    [actionTypes.AUTH_START]: authStart,
    [actionTypes.AUTH_SUCCESS]: authSuccess,
    [actionTypes.AUTH_FAIL]: authFail,
    [actionTypes.AUTH_LOGOUT]: authLogout,
    [actionTypes.AUTH_SET_REDIRECT_PATH]: setAuthRedirectPath
  };

  const method = mapping[action.type];

  if (!method) {
    return state;
  }

  return method(state, action);
};

export default reducer;
