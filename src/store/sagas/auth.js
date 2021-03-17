import axios from 'axios';
import { put, delay } from 'redux-saga/effects';

import {
  initiateLogout,
  logout,
  authStart,
  authSuccess,
  authFail,
  checkAuthTokenTimeout
} from '../actions';

const firebaseKey = process.env.REACT_APP_FIREBASE_KEY;
const baseAuthUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';

export function* logoutSaga(action) {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  yield put(logout());
}

export function* checkAuthTokenTimeoutSaga({ expirationTime }) {
  yield delay(expirationTime);
  yield put(initiateLogout());
}

export function* authenticateUserSaga({ email, password, isSignUp }) {
  yield put(authStart());

  const action = isSignUp ? 'signUp' : 'signInWithPassword';
  const authUrl = `${baseAuthUrl}:${action}?key=${firebaseKey}`;

  try {
    const authData = { email, password, returnSecureToken: true };
    const {
      data: { idToken, localId, expiresIn }
    } = yield axios.post(authUrl, authData);

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

    yield put(authSuccess(data));
    yield put(checkAuthTokenTimeout(expirationTimeInMilliseconds));
  } catch (error) {
    yield put(authFail(error));
  }
}

export function* authCheckStateSaga() {
  const token = localStorage.getItem('token');

  if (!token) {
    yield put(initiateLogout());
    return;
  }

  const now = new Date();
  const expirationDate = new Date(localStorage.getItem('expirationDate'));

  if (expirationDate > now) {
    const userId = localStorage.getItem('userId');
    const data = { userId, token };

    const expirationTime = expirationDate.getTime() - now.getTime();

    yield put(authSuccess(data));
    yield put(checkAuthTokenTimeout(expirationTime));
  } else {
    yield put(initiateLogout());
  }
}
