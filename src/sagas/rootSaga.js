import { all } from "redux-saga/effects";
import apiSaga from "./apiSaga";
import taskSaga from "./taskSaga";

export default function* rootSaga() {
  yield all([apiSaga(), taskSaga()]);
}
