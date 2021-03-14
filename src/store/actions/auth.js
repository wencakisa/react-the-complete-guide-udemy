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

export const auth = (email, password, isSignUp) => {
  return async dispatch => {
    dispatch(authStart());

    const action = isSignUp ? 'signUp' : 'signInWithPassword';
    const authUrl = `${baseAuthUrl}:${action}?key=${firebaseKey}`;

    try {
      const authData = { email, password, returnSecureToken: true };
      const response = await axios.post(authUrl, authData);
      dispatch(authSuccess(response.data));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};
