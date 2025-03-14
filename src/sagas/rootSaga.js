import { all } from "redux-saga/effects";
import apiSaga from "./apiSaga";
import authSaga from "./authSaga";
import taskSaga from "./taskSaga";

export default function* rootSaga() {
  yield all([apiSaga(), authSaga(), taskSaga()]);
}
