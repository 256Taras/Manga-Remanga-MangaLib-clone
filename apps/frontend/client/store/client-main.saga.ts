import { takeLatest } from "redux-saga/effects";
import { getTest } from "./test/slice";
import { handleGetUser } from './test/saga';


export function* clientMainSaga() {
  yield takeLatest(getTest.type, handleGetUser);
}
