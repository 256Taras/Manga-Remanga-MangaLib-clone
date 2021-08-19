import { createSelector } from '@reduxjs/toolkit';
import { IUsersState } from '../interfaces/users-state.interface';
import { IAuthFeatureState } from '../interfaces/auth-feature-state.interface';
import { IUser } from '@manga/utils/shared/interfaces';


const usersFeatureSelector = (state: IAuthFeatureState) => state.auth;

export const userSelector = createSelector(
  usersFeatureSelector,
  (users: IUsersState): Omit<IUser, 'password'> | null => users?.user
);

export const isUserLoadRunSelector = createSelector(
  usersFeatureSelector,
  (users: IUsersState): boolean | null => users?.userLoadRun
);

export const userLoadFailureSelector = createSelector(
  usersFeatureSelector,
  (users: IUsersState): string | null => users?.userLoadFailure
);


