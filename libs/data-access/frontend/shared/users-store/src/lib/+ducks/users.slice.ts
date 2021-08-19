import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { usersInitialState } from './users-initial-state';
import { IUser } from '@manga/utils/shared/interfaces';

export const userFeatureKey = 'user';

export const UsersSlice = createSlice({
  name: userFeatureKey,
  initialState: usersInitialState,
  reducers: {
    loadUserRunAction: (state): void => {
      state.userLoadRun = true;
      state.userLoadFailure = null;
    },
    loadUserSuccessAction: (state, { payload }: PayloadAction<IUser>): void => {
      console.log(payload);
      state.user = payload;
      state.userLoadRun = false;
    },
    loadUserFailureAction: (state, { payload }: PayloadAction<string>) => {
      state.userLoadRun = false;
      state.userLoadFailure = payload;
    }
  }
});

export const { actions } = UsersSlice;


export default UsersSlice.reducer;
