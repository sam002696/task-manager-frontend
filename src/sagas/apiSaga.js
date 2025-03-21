import { call, put, takeEvery } from "redux-saga/effects";
import fetcher from "../api/fetcher";
import { callApi, succeed, failed } from "../store/apiSlice";
import { setToastAlert } from "../store/errorSlice";

//  Worker saga to perform API calls
function* performApiAction(action) {
  //  Destructuring the action payload
  // The action payload contains the operationId, parameters, and output key
  // The operationId is the identifier for the API operation to be called.
  // The parameters object contains the data required for the API call.
  // The output key specifies where the API response should be stored in the Redux store.
  const {
    payload: { output = "output", operationId = "", parameters = {} },
  } = action;

  try {
    // Making the API call using the fetcher function
    const response = yield call(() => fetcher(operationId, parameters));

    // Dispatching the succeed action with the response and output key
    yield put(succeed({ response, output })); //  Generic success handling
    // Dispatching a toast alert with the success message
    yield put(
      setToastAlert({
        type: "success",
        message: response.message,
      })
    );
  } catch (error) {
    // Handling API call errors
    const errorMessage = error?.response?.message || "Something went wrong!";

    yield put(failed({ error: errorMessage }));
    yield put(setToastAlert({ type: "error", message: errorMessage }));
  }
}

//  Listening for all API calls using `callApi`
export default function* apiSaga() {
  yield takeEvery(callApi.type, performApiAction);
}
