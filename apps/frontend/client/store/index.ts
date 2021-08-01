import { createWrapper } from 'next-redux-wrapper';


import { storeConfig } from './store.config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { rootStoreModule } from "@manga/data-access/frontend/shared/root-store";
import { Store } from '@reduxjs/toolkit';
import { TAppState } from './interfaces/app-state.type';


export const reduxNextWrapper = createWrapper<Store<TAppState>>(
  (ctx) =>
    rootStoreModule(storeConfig)
);
