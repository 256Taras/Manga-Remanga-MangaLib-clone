import { call, put } from 'redux-saga/effects';


export const setUser = (user) => ({
  type: 'SET_USER',
  user
});

function getUser() {
 return [{
   username:'test'
 }]
}

export function* handleGetUser(action) {
  try {
    const data = yield call(getUser);
    console.log('data',data);
    yield put(setUser(data));
  } catch (error) {
    console.log(error);
  }
}
