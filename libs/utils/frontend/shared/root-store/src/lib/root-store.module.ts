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


import { IRootStoreOption } from './interfaces/root-store-option.interface';
import { createInjectorsEnhancer } from 'redux-injectors';


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
 // const rootReducer = combineReducers(reducers);


  /**
   * Run saga
   */
  const sagaMiddleware = createSagaMiddleware();


  /**
   * Merge all middleware, off default middleware redux-toolkit redux-thunk
   */
  const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

  function createReducer(injectedReducers = {}) {
    return combineReducers({
      ...injectedReducers,
      ...reducers
      // other non-injected reducers can go here...
    })
  }


  const { run: runSaga } = sagaMiddleware;


  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];


  /**
   * Add an extra parameter for applying middleware
   */
  const store = configureStore({
    reducer: createReducer(),
    middleware,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    enhancers,
  });


  /**
   * Run  sagas on server
   */
 // (store as unknown as ISagaStore).sagaTask()

  /**
   *  now return the store:
   */
  return store;

}
