import {  createWrapper } from 'next-redux-wrapper';
import {  Store } from '@reduxjs/toolkit';

import { storeConfig } from './store.config';
import { TAppState } from './interfaces/app-state.type';
import { rootStoreModule } from '@manga/utils/frontend/shared/root-store';
//import { useDispatch } from 'react-redux';

const store = rootStoreModule(storeConfig);



export const reduxNextWrapper = createWrapper<Store<TAppState>>(
  () => store
);


// export type AppDispatch = typeof store.dispatch
//
// export const useAppDispatch = () => useDispatch<AppDispatch>()
