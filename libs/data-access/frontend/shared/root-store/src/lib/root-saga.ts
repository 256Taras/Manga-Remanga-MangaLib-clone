import { spawn, call, all } from 'redux-saga/effects';

export  function rootSagaWrapper(sagas: any[]) {

  return function* () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const retrySagas = yield sagas.map(saga => {
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


