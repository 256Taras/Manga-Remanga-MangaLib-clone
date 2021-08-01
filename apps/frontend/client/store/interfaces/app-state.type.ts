import { storeConfig } from '../store.config';

const { reducers } = storeConfig;

export type TAppState = typeof reducers;
