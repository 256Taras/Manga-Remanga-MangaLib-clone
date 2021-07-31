import { takeLatest } from "redux-saga/effects";
import { getUser } from "./test/slice";
import { handleGetUser } from './test/saga';


export function* clientMainSaga() {
  yield takeLatest(getUser.type, handleGetUser);
}
