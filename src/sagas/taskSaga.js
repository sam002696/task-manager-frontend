import { call, put, takeEvery } from "redux-saga/effects";
import { succeed, failed } from "../store/apiSlice";
import {
  setTasks,
  addTaskLocal,
  updateTaskLocal,
  deleteTaskLocal,
} from "../store/taskSlice";
import { TASK_API } from "../constants/apiConstants";
import fetcher from "../api/fetcher";

function* fetchTasks() {
  try {
    const response = yield call(() => fetcher(TASK_API.FETCH));
    yield put(succeed({ response, output: TASK_API.FETCH }));
    yield put(setTasks(response)); // Update state
  } catch (error) {
    yield put(failed({ error: error.message }));
  }
}

function* addTask(action) {
  try {
    const response = yield call(() =>
      fetcher(TASK_API.CREATE, action.payload.parameters)
    );

    yield put(succeed({ response, output: TASK_API.CREATE }));
    yield put(addTaskLocal(response)); // Optimistically update UI
  } catch (error) {
    yield put(failed({ error: error.message }));
  }
}

function* updateTask(action) {
  try {
    const response = yield call(() =>
      fetcher(TASK_API.UPDATE(action.payload.id), action.payload.parameters)
    );

    yield put(
      succeed({ response, output: TASK_API.UPDATE(action.payload.id) })
    );
    yield put(updateTaskLocal(response)); // Update UI with new task data
  } catch (error) {
    yield put(failed({ error: error.message }));
  }
}

function* deleteTask(action) {
  try {
    yield call(() =>
      fetcher(TASK_API.DELETE(action.payload.id), { method: "DELETE" })
    );

    yield put(
      succeed({ response: null, output: TASK_API.DELETE(action.payload.id) })
    );
    yield put(deleteTaskLocal(action.payload.id)); // Remove task from state
  } catch (error) {
    yield put(failed({ error: error.message }));
  }
}

export default function* taskSaga() {
  yield takeEvery(TASK_API.FETCH, fetchTasks);
  yield takeEvery(TASK_API.CREATE, addTask);
  yield takeEvery(TASK_API.UPDATE(""), updateTask);
  yield takeEvery(TASK_API.DELETE(""), deleteTask);
}
