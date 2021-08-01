import { spawn, call, all } from 'redux-saga/effects';
import { Saga } from '@redux-saga/types';


export function rootSagaWrapper(sagas: Saga[]) {

  return function* () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const retrySagas = yield sagas.map((saga: Saga) => {
      return spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      });
    });

    yield all(retrySagas);
  };
}


