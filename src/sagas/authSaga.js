import { call, put, takeEvery } from "redux-saga/effects";
import { logout } from "../store/authSlice";
import { AUTH_API } from "../constants/apiConstants";
import fetcher from "../api/fetcher";
import { setToastAlert } from "../store/errorSlice";

function* handleLogout() {
  try {
    yield call(() => fetcher(AUTH_API.LOGOUT, { method: "POST" }));
    yield put(logout());
    yield put(
      setToastAlert({ type: "success", message: "Logged out successfully" })
    );
  } catch (error) {
    yield put(
      setToastAlert({
        type: "error",
        message: error.message || "Something went wrong",
      })
    );
  }
}

//  Only listen for logout actions
export default function* authSaga() {
  yield takeEvery(logout.type, handleLogout);
}
