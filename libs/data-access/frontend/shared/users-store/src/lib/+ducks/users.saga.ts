import { call, put, takeLatest } from 'redux-saga/effects';

import { loadUserRunAction, loadUserFailureAction, loadUserSuccessAction, loadUserStart } from './users.action';
import { UsersApi } from '../services/users.api';



export function* fetchUserDataRequest() {
  try {
    yield put(loadUserRunAction());
    const { user } = yield call(UsersApi.getMe);
    console.log(user);
    yield put(loadUserSuccessAction(user));
  } catch (error) {
    yield put(loadUserFailureAction('no auth'));
  }
}


export function* authSagaWatcher() {
  yield takeLatest(loadUserStart.type, fetchUserDataRequest);
}
