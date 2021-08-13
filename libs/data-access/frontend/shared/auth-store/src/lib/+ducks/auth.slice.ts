import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './auth-initial-state';

export const authFeatureKey = 'auth';

export const AuthSlice = createSlice({
  name: authFeatureKey,
  initialState,
  reducers: {
    setIsSubmittingTrue: (state) => {
      state.isSubmitting = true;
    },
    signInSuccessAction: (state) => {
      state.isSubmitting = false;
      state.isLoggedIn = true;
      state.validationErrors = null;
    },
    signInFailureAction: (state, { payload }: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    signUpSuccessAction: (state) => {
      state.isSubmitting = false;
      state.isLoggedIn = true;
      state.validationErrors = null;
    },
    signUpFailureAction: (state, { payload }: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    signOutSuccessAction: (state) => {
      state.isSubmitting = false;
      state.isLoggedIn = false;
      state.validationErrors = null;
    },
    signOutFailureAction: (state, { payload }: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.validationErrors = payload;
    }

  }
});

export const { actions } = AuthSlice;


export default AuthSlice.reducer;
