import { isSubmittingSelector, validationErrorsInSelector, isLoggedInSelector } from '../+ducks/auth.selector';
import { useDispatch, useSelector } from 'react-redux';
import { ISingInRequest, ISingUpRequest } from '@manga/utils/shared/interfaces';
import { signInStartAction, signUpStartAction, signOutStartAction } from '../+ducks/auth.action';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import authSlice from '../+ducks/auth.slice';
import { authSagaWatcher } from '../+ducks/auth.saga';

export const useAuthFacade = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: 'auth', reducer: authSlice });
  useInjectSaga({ key: 'auth', saga: authSagaWatcher });



  const isSubmitting = useSelector(isSubmittingSelector);
  const validationErrorsIn = useSelector(validationErrorsInSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);

  const signIn = (user: ISingInRequest): void => {
    console.log('start auth facad');
    dispatch(signInStartAction(user));
  };

  const signUp = (candidate: ISingUpRequest): void => {
    console.log('start auth facad');
    dispatch(signUpStartAction(candidate));
  };

  const signOut = (): void => {
    dispatch(signOutStartAction());
  };

  return {
    isLoggedIn,
    validationErrorsIn,
    isSubmitting,
    signUp,
    signOut,
    signIn
  };
};
