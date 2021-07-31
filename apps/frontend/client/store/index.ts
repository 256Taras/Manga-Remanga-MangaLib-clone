import { createWrapper } from 'next-redux-wrapper';


import { storeConfig } from './store.config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { rootStoreModule } from "@manga/data-access/frontend/shared/root-store";

export const reduxNextWrapper = createWrapper(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  (ctx) => // @ts-ignore
    rootStoreModule(storeConfig)
);
