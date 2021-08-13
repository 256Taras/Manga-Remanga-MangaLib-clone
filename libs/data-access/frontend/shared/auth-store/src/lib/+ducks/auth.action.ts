import { actions } from './auth.slice';
import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { ISingInRequest, ISingUpRequest } from '@manga/utils/shared/interfaces';

export const signInStartAction = createAction<PayloadAction<ISingInRequest>>('[auth] start sing-in')
export const signUpStartAction = createAction('[auth] start sing-up', (payload: ISingUpRequest) => ({ payload }));
export const signOutStartAction = createAction('[auth] start sing-up');


export const {
  setIsSubmittingTrue,

  signInSuccessAction,
  signUpSuccessAction,
  signOutSuccessAction,

  signInFailureAction,
  signUpFailureAction,
  signOutFailureAction
} = actions;
