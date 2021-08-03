import { createWrapper } from 'next-redux-wrapper';
import { Store } from '@reduxjs/toolkit';

import { rootStoreModule } from "@manga/data-access/frontend/shared/root-store";

import { storeConfig } from './store.config';
import { TAppState } from './interfaces/app-state.type';


export const reduxNextWrapper = createWrapper<Store<TAppState>>(
  (ctx) =>
    rootStoreModule(storeConfig)
);
