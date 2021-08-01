import counterReducer from './test/slice';
import { clientMainSaga } from './client-main.saga';

const reducers = {
  counter: counterReducer
};

const sagas = [
  clientMainSaga
];


export const storeConfig = {
  reducers,
  sagas
};
