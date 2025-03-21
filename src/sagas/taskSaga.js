import { call, put, select, takeLatest, debounce } from "redux-saga/effects";
import { succeed, failed } from "../store/apiSlice";
import {
  setTasks,
  addTaskLocal,
  updateTaskLocal,
  deleteTaskLocal,
  setFilters,
  setError,
  setLoading,
} from "../store/taskSlice";
import { TASK_API } from "../constants/apiConstants";
import fetcher from "../api/fetcher";
import { setToastAlert } from "../store/errorSlice";

function* fetchTasks() {
  try {
    yield put(setLoading());
    const filters = yield select((state) => state.tasks.filters); // Getting filters from Redux

    let queryParams = new URLSearchParams();

    if (filters.status !== "All") queryParams.append("status", filters.status);
    if (filters.sort === "newest") {
      queryParams.append("sort", "desc");
    } else if (filters.sort === "oldest") {
      queryParams.append("sort", "asc");
    }

    if (filters.search) queryParams.append("search", filters.search);

    if (filters.due_date_from && filters.due_date_to) {
      queryParams.append("due_date_from", filters.due_date_from);
      queryParams.append("due_date_to", filters.due_date_to);
    }

    const response = yield call(() =>
      fetcher(`${TASK_API.FETCH}?${queryParams}`)
    );

    if (response?.data) {
      yield put(setTasks(response.data));
    }

    yield put(succeed({ response, output: "taskLists" }));
  } catch (error) {
    yield put(failed({ error: error.message }));
    yield put(setError(error.message));
  }
}

function* addTask(action) {
  try {
    const { taskData, onSuccess } = action.payload;

    yield put(setLoading());

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
    const errorMessage = error?.response?.message;
    yield put(setError(errorMessage));
    yield put(failed({ error: errorMessage }));
    yield put(
      setToastAlert({
        type: "error",
        message: errorMessage || " Something went wrong",
      })
    );
  }
}

function* updateTask(action) {
  let previousTasks = [];

  try {
    const { taskId, taskData } = action.payload;

    previousTasks = yield select((state) => state.tasks.tasks); //  Save old state

    // Optimistically updating UI
    yield put(updateTaskLocal({ id: taskId, ...taskData }));

    //  Ensuring function is called with `taskId`
    const response = yield call(() =>
      fetcher(TASK_API.UPDATE(taskId), {
        method: "PUT",
        body: JSON.stringify(taskData),
      })
    );

    if (!response?.data) {
      throw new Error("Invalid API response.");
    }

    yield put(succeed({ response, output: TASK_API.UPDATE(taskId) }));
    yield put(
      setToastAlert({ type: "success", message: "Task updated successfully!" })
    );
  } catch (error) {
    const errorMessage = error?.response?.message;
    yield put(failed({ error: errorMessage }));

    if (previousTasks.length > 0) {
      yield put(setTasks(previousTasks));
    }

    yield put(setToastAlert({ type: "error", message: errorMessage }));
  }
}

function* deleteTask(action) {
  let previousTasks = [];

  try {
    const { taskId, onSuccess } = action.payload;

    yield put(setLoading());

    // Save previous state for rollback in case of failure
    previousTasks = yield select((state) => state.tasks.tasks);

    // Optimistically remove task from UI
    yield put(deleteTaskLocal(taskId));

    // Call API to delete task
    const response = yield call(() =>
      fetcher(TASK_API.DELETE(taskId), {
        method: "DELETE",
      })
    );

    if (response?.status === "success") {
      yield put(succeed({ output: TASK_API.DELETE(taskId) }));
      yield put(setToastAlert({ type: "success", message: response?.message }));

      if (onSuccess) onSuccess();
    }
  } catch (error) {
    const errorMessage = error?.response?.message;
    yield put(setError(errorMessage));
    yield put(failed({ error: errorMessage }));

    // Rollback UI update in case of failure
    if (previousTasks.length > 0) {
      yield put(setTasks(previousTasks));
    }

    yield put(setToastAlert({ type: "error", message: errorMessage }));
  }
}

// Debounced Search
function* handleSearchTasks(action) {
  const currentFilters = yield select((state) => state.tasks.filters);

  yield put(setFilters({ ...currentFilters, search: action.payload }));
  yield call(fetchTasks);
}

//  Saga Watcher
export default function* taskSaga() {
  yield takeLatest("taskLists", fetchTasks);
  yield takeLatest("taskAdd", addTask);
  yield takeLatest("updateTask", updateTask);
  yield takeLatest("deleteTask", deleteTask);
  yield debounce(500, "searchTasks", handleSearchTasks);
}
