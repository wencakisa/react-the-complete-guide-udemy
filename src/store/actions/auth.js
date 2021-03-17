import * as actionTypes from './actionTypes';

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData
});

export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

export const initiateLogout = () => ({
  type: actionTypes.AUTH_INITIATE_LOGOUT
});
export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTokenTimeout = expirationTime => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime
});

export const setAuthRedirectPath = authRedirectPath => ({
  type: actionTypes.AUTH_SET_REDIRECT_PATH,
  authRedirectPath
});

export const auth = (email, password, isSignUp) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignUp
});

export const authCheckState = () => ({ type: actionTypes.AUTH_CHECK_STATE });
