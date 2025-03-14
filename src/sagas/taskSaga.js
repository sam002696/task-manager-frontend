import { call, put, takeEvery } from "redux-saga/effects";
import { callApi, succeed, failed } from "../store/apiSlice";
import {
  setTasks,
  addTaskLocal,
  updateTaskLocal,
  deleteTaskLocal,
} from "../store/taskSlice";
import { TASK_API } from "../constants/apiConstants";
import fetcher from "../api/fetcher";

function* fetchTasks(action) {
  const { operationId, parameters } = action.payload;

  try {
    yield put(callApi({ operationId, parameters }));
    const response = yield call(() => fetcher(operationId, parameters));

    yield put(succeed({ response, output: operationId }));
    yield put(setTasks(response)); // Update tasks in state
  } catch (error) {
    yield put(failed({ error: error.message }));
  }
}

function* addTask(action) {
  const { operationId, parameters } = action.payload;

  try {
    yield put(callApi({ operationId, parameters }));
    const response = yield call(() => fetcher(operationId, parameters));

    yield put(succeed({ response, output: operationId }));
    yield put(addTaskLocal(response)); // Optimistically update UI
  } catch (error) {
    yield put(failed({ error: error.message }));
  }
}

function* updateTask(action) {
  const { operationId, parameters } = action.payload;

  try {
    yield put(callApi({ operationId, parameters }));
    const response = yield call(() => fetcher(operationId, parameters));

    yield put(succeed({ response, output: operationId }));
    yield put(updateTaskLocal(response)); // Update UI with new task data
  } catch (error) {
    yield put(failed({ error: error.message }));
  }
}

function* deleteTask(action) {
  const { operationId, parameters } = action.payload;

  try {
    yield put(callApi({ operationId, parameters }));
    yield call(() => fetcher(operationId, parameters));

    yield put(succeed({ response: null, output: operationId }));
    yield put(deleteTaskLocal(parameters.id)); // Remove task from state
  } catch (error) {
    yield put(failed({ error: error.message }));
  }
}

export default function* taskSaga() {
  yield takeEvery(callApi.type, function* (action) {
    const { operationId } = action.payload;

    if (operationId.includes("/tasks")) {
      if (operationId === TASK_API.FETCH) yield call(fetchTasks, action);
      else if (operationId === TASK_API.CREATE) yield call(addTask, action);
      else if (operationId.startsWith(TASK_API.UPDATE("")))
        yield call(updateTask, action);
      else if (operationId.startsWith(TASK_API.DELETE("")))
        yield call(deleteTask, action);
    }
  });
}
