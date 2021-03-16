import axios from 'axios';

import * as actionTypes from './actionTypes';

const firebaseKey = process.env.REACT_APP_FIREBASE_KEY;
const baseAuthUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData
});

export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTokenTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => dispatch(logout()), expirationTime);
  };
};

export const setAuthRedirectPath = authRedirectPath => ({
  type: actionTypes.AUTH_SET_REDIRECT_PATH,
  authRedirectPath
});

export const auth = (email, password, isSignUp) => {
  return async dispatch => {
    dispatch(authStart());

    const action = isSignUp ? 'signUp' : 'signInWithPassword';
    const authUrl = `${baseAuthUrl}:${action}?key=${firebaseKey}`;

    try {
      const authData = { email, password, returnSecureToken: true };
      const {
        data: { idToken, localId, expiresIn }
      } = await axios.post(authUrl, authData);

      const data = {
        userId: localId,
        token: idToken
      };

      const expirationTimeInMilliseconds = expiresIn * 1000;
      const expirationDate = new Date(
        new Date().getTime() + expirationTimeInMilliseconds
      );

      localStorage.setItem('token', idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', localId);

      dispatch(authSuccess(data));
      dispatch(checkAuthTokenTimeout(expirationTimeInMilliseconds));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
      return;
    }

    const now = new Date();
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (expirationDate > now) {
      const userId = localStorage.getItem('userId');
      const data = { userId, token };

      const expirationTime = expirationDate.getTime() - now.getTime();

      dispatch(authSuccess(data));
      dispatch(checkAuthTokenTimeout(expirationTime));
    } else {
      dispatch(logout());
    }
  };
};
