import createSagaMiddleware from 'redux-saga';
import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  Dispatch,
  EnhancedStore,
  getDefaultMiddleware,
  Middleware
} from '@reduxjs/toolkit';

import { ISagaStore } from './interfaces/saga-store.interface';
import { rootSagaWrapper } from './root-saga';
import { IRootStoreOption } from './interfaces/root-store-option.interface';


/**
 * @description - function which will create a general store based on redux-saga
 */




/**
 * Get array sagas and collection object reducers
 */

//ts-ignore
export function rootStoreModule({ sagas, reducers }: IRootStoreOption):  EnhancedStore< any, Action<any>, Middleware<Record<string, unknown>, any, Dispatch<AnyAction>>[]> {


  /**
   * Combine all reducers in one
   */
  const rootReducer = combineReducers(reducers);


  /**
   * Run saga
   */
  const sagaMiddleware = createSagaMiddleware();


  /**
   * Merge all middleware, off default middleware redux-toolkit redux-thunk
   */
  const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];


  /**
   * Add an extra parameter for applying middleware
   */
  const store = configureStore({
    reducer: rootReducer,
    middleware
  });


  /**
   * Run  sagas on server
   */
  (store as unknown as ISagaStore).sagaTask = sagaMiddleware.run(rootSagaWrapper(sagas));


  /**
   *  now return the store:
   */
  return store;

}
