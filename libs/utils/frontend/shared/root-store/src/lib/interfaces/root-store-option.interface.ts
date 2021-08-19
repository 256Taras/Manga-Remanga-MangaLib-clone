import { Saga } from '@redux-saga/types';
import { ReducersMapObject } from 'redux';


/**
 * interface option for store module
 * include array sagas and collection reducers or slice
 */
export interface IRootStoreOption {
  sagas:Saga[]
  reducers:ReducersMapObject
}
