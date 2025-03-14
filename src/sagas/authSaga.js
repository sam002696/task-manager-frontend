import { call, put, takeEvery } from "redux-saga/effects";
import { callApi, succeed, failed } from "../store/apiSlice";
import { loginSuccess, logout } from "../store/authSlice";
import { AUTH_API } from "../constants/apiConstants";
import fetcher from "../api/fetcher";

function* handleAuth(action) {
  const { operationId, parameters } = action.payload;

  try {
    yield put(callApi({ operationId, parameters }));
    const response = yield call(() => fetcher(operationId, parameters));

    yield put(succeed({ response, output: operationId }));

    if (operationId === AUTH_API.LOGIN) {
      yield put(loginSuccess(response));
    }
  } catch (error) {
    yield put(failed({ error: error.message }));
  }
}

function* handleLogout() {
  try {
    yield call(() => fetcher(AUTH_API.LOGOUT, { method: "POST" }));
    yield put(logout());
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export default function* authSaga() {
  yield takeEvery(callApi.type, handleAuth);
  yield takeEvery(logout.type, handleLogout);
}
