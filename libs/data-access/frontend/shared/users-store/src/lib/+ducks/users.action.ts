import { actions } from './users.slice';
import { createAction } from '@reduxjs/toolkit';

export const loadUserStart = createAction('[users] fetch user start')

export const { loadUserFailureAction,loadUserRunAction,loadUserSuccessAction } = actions;
