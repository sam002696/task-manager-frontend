import { call, put, takeEvery } from "redux-saga/effects";
import fetcher from "../api/fetcher";
import { callApi, succeed, failed } from "../store/apiSlice";
import { setToastAlert } from "../store/toastAlertSlice";

function* performApiAction(action) {
  const {
    payload: { operationId = "", parameters = {} },
  } = action;

  try {
    const response = yield call(() => fetcher(operationId, parameters));
    yield put(succeed({ response, output: operationId }));
    yield put(setToastAlert({ type: "success", message: response.message }));
  } catch (error) {
    yield put(failed({ error: error.message }));
    yield put(setToastAlert({ type: "error", message: error.message }));
  }
}

export default function* apiSaga() {
  yield takeEvery(callApi.type, performApiAction);
}
