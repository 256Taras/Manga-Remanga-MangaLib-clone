import { actions } from './auth.slice';
import { createAction } from '@reduxjs/toolkit';
import { ISingInRequest, ISingUpRequest } from '@manga/utils/shared/interfaces';

export const signInStartAction = createAction<ISingInRequest>('[*auth] start sing-in')
export const signUpStartAction = createAction<ISingUpRequest>('[auth] start sing-up');
export const signOutStartAction = createAction('[auth] start sing-out');


export const {
  setIsSubmittingTrue,

  signInSuccessAction,
  signUpSuccessAction,
  signOutSuccessAction,

  signInFailureAction,
  signUpFailureAction,
  signOutFailureAction
} = actions;
