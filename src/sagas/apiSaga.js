import { call, put, takeEvery } from "redux-saga/effects";
import fetcher from "../api/fetcher";
import { callApi, succeed, failed } from "../store/apiSlice";
import { setToastAlert } from "../store/errorSlice";
// import { loginSuccess } from "../store/authSlice";
import { AUTH_API } from "../constants/apiConstants";

function* performApiAction(action) {
  const {
    payload: { output = "output", operationId = "", parameters = {} },
  } = action;

  try {
    const response = yield call(() => fetcher(operationId, parameters));

    // if (operationId === AUTH_API.LOGIN && response?.status === "success") {
    //   yield put(loginSuccess(response));
    // }

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
