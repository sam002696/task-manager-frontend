import { call, put, select, takeLatest } from "redux-saga/effects";
import { succeed, failed } from "../store/apiSlice";
import { setTasks, addTaskLocal } from "../store/taskSlice";
import { TASK_API } from "../constants/apiConstants";
import fetcher from "../api/fetcher";
import { setToastAlert } from "../store/errorSlice";

function* fetchTasks() {
  try {
    const response = yield call(() => fetcher(TASK_API.FETCH));

    if (response?.data) {
      yield put(setTasks(response.data));
    }

    yield put(succeed({ response, output: TASK_API.FETCH }));
  } catch (error) {
    yield put(failed({ error: error.message }));
  }
}

function* addTask(action) {
  try {
    const { taskData, onSuccess } = action.payload;

    const response = yield call(() =>
      fetcher(TASK_API.CREATE, {
        method: "POST",
        body: JSON.stringify(taskData),
      })
    );

    if (response?.data) {
      const existingTasks = yield select((state) => state.tasks.tasks);
      const exists = existingTasks.some((task) => task.id === response.data.id);

      if (!exists) {
        // optimistically updating the UI
        yield put(addTaskLocal(response.data));
      }

      //  Ensuring Success Before Proceeding
      yield put(
        setToastAlert({
          type: "success",
          message: response?.message || "Task created successfully!",
        })
      );

      if (onSuccess) onSuccess();

      //  Fetching Latest Data
      yield put({ type: TASK_API.FETCH });

      //  Confirm Success Before Exiting
      yield put(succeed({ response, output: TASK_API.CREATE }));
      return;
    }

    throw new Error("Invalid API response. Task data is missing.");
  } catch (error) {
    console.error("❌ Error in Task Creation:", error?.response?.message);

    // const errorMessage = error?.response?.message;

    // yield put(failed({ error: errorMessage }));
    // yield put(
    //   setToastAlert({
    //     type: "error",
    //     message: errorMessage || " Something went wrong",
    //   })
    // );
  }
}

//  Saga Watcher
export default function* taskSaga() {
  yield takeLatest(TASK_API.FETCH, fetchTasks);
  yield takeLatest(TASK_API.CREATE, addTask);
}
