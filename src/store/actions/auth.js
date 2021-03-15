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

export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTokenTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => dispatch(logout()), expirationTime * 1000);
  };
};

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

      dispatch(authSuccess(data));
      dispatch(checkAuthTokenTimeout(expiresIn));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};
