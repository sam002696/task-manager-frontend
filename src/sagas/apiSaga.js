import { call, put, takeEvery } from "redux-saga/effects";
import fetcher from "../api/fetcher";
import { callApi, succeed, failed } from "../store/apiSlice";
import { setToastAlert } from "../store/errorSlice";

function* performApiAction(action) {
  const {
    payload: { output = "output", operationId = "", parameters = {} },
  } = action;

  try {
    const response = yield call(() => fetcher(operationId, parameters));

    yield put(succeed({ response, output })); //  Generic success handling
    yield put(
      setToastAlert({
        type: "success",
        message: response.message,
      })
    );
  } catch (error) {
    const errorMessage = error?.response?.message || "Something went wrong!";

    yield put(failed({ error: errorMessage }));
    yield put(setToastAlert({ type: "error", message: errorMessage }));
  }
}

//  Listening for all API calls using `callApi`
export default function* apiSaga() {
  yield takeEvery(callApi.type, performApiAction);
}
