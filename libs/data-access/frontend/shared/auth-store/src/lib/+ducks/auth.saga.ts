import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';


import { ISingInRequest, ISingUpRequest } from '@manga/utils/shared/interfaces';
import { AuthApi } from '../services/auth.api';
import {
  setIsSubmittingTrue,
  signInFailureAction,
  signInStartAction,
  signInSuccessAction,
  signOutStartAction,
  signUpFailureAction,
  signUpStartAction,
  signUpSuccessAction
} from './auth.action';


export function* fetchSignInRequest({ payload }: PayloadAction<ISingInRequest>) {
  try {
    yield put(setIsSubmittingTrue());
    const { data } = yield call(AuthApi.signIn, payload);
    if (data.message === 'success') {
      yield put(signInSuccessAction());
    } else {
      yield put(signInFailureAction('server error, try again'));
    }
  } catch (error) {
    yield put(signInFailureAction('Something went wrong, try again'));
  }
}

export function* fetchSignOutRequest() {
  try {
    const { data } = yield call(AuthApi.signOut);
    if (data.message === 'success') {
      yield put(signInSuccessAction());
    } else {
      yield put(signInFailureAction('server error, try again'));
    }
  } catch (error) {
    yield put(signInFailureAction('Something went wrong, try again'));
  }
}

export function* fetchSignUpRequest({ payload }: PayloadAction<ISingUpRequest>) {
  try {
    const { data } = yield call(AuthApi.signUp, payload);
    if (data.message === 'success') {
      yield put(signUpSuccessAction());
    } else {
      yield put(signUpFailureAction('server error, try again'));
    }
  } catch (error) {
    yield put(signUpFailureAction('Something went wrong, try again'));
  }
}

export function* authSagaWatcher() {
  yield takeLatest(signInStartAction.type, fetchSignInRequest);
  yield takeLatest(signUpStartAction.type, fetchSignUpRequest);
  yield takeLatest(signOutStartAction.type, fetchSignOutRequest);
}
