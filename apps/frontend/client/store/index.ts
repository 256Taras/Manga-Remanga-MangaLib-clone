import { createWrapper } from 'next-redux-wrapper';
import { Store } from '@reduxjs/toolkit';

import { storeConfig } from './store.config';
import { TAppState } from './interfaces/app-state.type';
import { rootStoreModule } from '@manga/utils/frontend/shared/root-store';


export const reduxNextWrapper = createWrapper<Store<TAppState>>(
  (ctx) =>
    rootStoreModule(storeConfig)
);
