import { Store } from 'redux';
import { Task } from 'redux-saga';

/**
 * interface saga store
 */
export interface ISagaStore extends Store {
  sagaTask?: Task;
}
