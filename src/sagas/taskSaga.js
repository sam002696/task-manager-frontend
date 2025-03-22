import { call, put, select, takeLatest, debounce } from "redux-saga/effects";
import {
  setTasks,
  addTaskLocal,
  updateTaskLocal,
  deleteTaskLocal,
  setFilters,
  setError,
  setLoading,
  clearLoading,
} from "../store/taskSlice";
import { succeed, failed } from "../store/apiSlice";
import { setToastAlert } from "../store/errorSlice";
import { TASK_API } from "../constants/apiConstants";
import fetcher from "../api/fetcher";
import { AuthUser } from "../helpers/AuthUser";

/**
 * Generic saga handler to streamline API calls.
 * Handles:
 * - Loading state
 * - API call execution
 * - Success callback (optional)
 * - Error handling and toasts
 * - Rollback logic (optional)
 */
function* handleApiFlow({
  apiCall,
  onSuccess,
  onError,
  rollbackState,
  output,
}) {
  try {
    // Starting loading indicator
    yield put(setLoading());

    // Executing the provided API call
    const response = yield call(apiCall);

    // Checking for valid response structure
    if (!response?.data && response?.status !== "success") {
      throw new Error("Invalid API response.");
    }

    // Executing optional success callback
    if (onSuccess) yield call(onSuccess, response);

    // Dispatching success tracking
    yield put(succeed({ response, output }));
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error?.response?.message || error.message || "Something went wrong";

    if (errorMessage == "Invalid or missing authentication token") {
      AuthUser.logout();
    }

    // Updating error state and show user-friendly alert
    yield put(setError(errorMessage));
    yield put(failed({ error: errorMessage }));
    yield put(setToastAlert({ type: "error", message: errorMessage }));

    // Executing optional rollback logic
    if (rollbackState) yield put(rollbackState());
    // Executing optional error callback
    if (onError) yield call(onError, errorMessage);
  } finally {
    // Clearing loading indicator
    yield put(clearLoading());
  }
}

/**
 * Fetching all tasks based on current filters from Redux.
 * Filters may include: status, sort order, search, and due date range.
 */
function* fetchTasks() {
  yield call(handleApiFlow, {
    apiCall: function* () {
      const filters = yield select((state) => state.tasks.filters);
      const queryParams = new URLSearchParams();

      if (filters.status !== "All")
        queryParams.append("status", filters.status);
      if (filters.sort === "newest") queryParams.append("sort", "desc");
      else if (filters.sort === "oldest") queryParams.append("sort", "asc");
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.due_date_from && filters.due_date_to) {
        queryParams.append("due_date_from", filters.due_date_from);
        queryParams.append("due_date_to", filters.due_date_to);
      }

      // Fetching tasks based on the query parameters
      return yield call(() => fetcher(`${TASK_API.FETCH}?${queryParams}`));
    },
    onSuccess: function* (response) {
      // Updating the tasks state with the fetched tasks
      yield put(setTasks(response.data));
    },
    output: "taskLists",
  });
}

/**
 * Adding a new task (with optimistic UI update).
 */
function* addTask({ payload }) {
  // Destructuring the payload
  const { taskData, onSuccess } = payload;

  yield call(handleApiFlow, {
    // API call to create a new task
    apiCall: () =>
      fetcher(TASK_API.CREATE, {
        method: "POST",
        body: JSON.stringify(taskData),
      }),
    // Success callback to update the tasks state
    onSuccess: function* (response) {
      const tasks = yield select((state) => state.tasks.tasks);
      const exists = tasks.some((task) => task.id === response.data.id);
      if (!exists) yield put(addTaskLocal(response.data));

      yield put(
        setToastAlert({
          type: "success",
          message: response?.message || "Task created successfully!",
        })
      );

      if (onSuccess) onSuccess();
      yield put({ type: "taskLists" }); // Fetch tasks to update the list
    },
    output: "taskAdd",
  });
}

/**
 * Updating an existing task (with optimistic UI update and rollback).
 * If the API call fails, we restore the previous state.
 */
function* updateTask({ payload }) {
  const { taskId, taskData } = payload;

  // Backing up current state for rollback
  const previousState = yield select((state) => state.tasks.tasks);

  // Optimistic update
  yield put(updateTaskLocal({ id: taskId, ...taskData })); // Optimistic update

  // API call to update the task
  yield call(handleApiFlow, {
    apiCall: () =>
      fetcher(TASK_API.UPDATE(taskId), {
        method: "PUT",
        body: JSON.stringify(taskData),
      }),
    onSuccess: function* (response) {
      yield put(
        setToastAlert({
          type: "success",
          message: response?.message || "Task updated successfully!",
        })
      );
    },
    rollbackState: () => setTasks(previousState),
    output: "updateTask",
  });
}

/**
 * Delete a task (with optimistic UI update and rollback).
 * Removes task from UI immediately, and rolls back if API fails.
 */
function* deleteTask({ payload }) {
  const { taskId, onSuccess } = payload;

  // Saving current state for rollback
  const previousTasks = yield select((state) => state.tasks.tasks);

  yield put(deleteTaskLocal(taskId)); // Optimistic delete

  // API call to delete the task
  yield call(handleApiFlow, {
    apiCall: () =>
      fetcher(TASK_API.DELETE(taskId), {
        method: "DELETE",
      }),
    onSuccess: function* (response) {
      yield put(setToastAlert({ type: "success", message: response?.message }));
      if (onSuccess) onSuccess();
    },
    rollbackState: () => setTasks(previousTasks),
    output: "deleteTask",
  });
}

/**
 * Handle debounced search input for filtering tasks.
 * Waits for 500ms after the last keystroke before triggering fetch.
 */
function* handleSearchTasks({ payload }) {
  const filters = yield select((state) => state.tasks.filters);

  // Updating the search filter and fetching tasks
  yield put(setFilters({ ...filters, search: payload }));
  yield call(fetchTasks);
}

/**
 * Root task saga watcher.
 * Maps action types to saga handlers.
 */
export default function* taskSaga() {
  yield takeLatest("taskLists", fetchTasks);
  yield takeLatest("taskAdd", addTask);
  yield takeLatest("updateTask", updateTask);
  yield takeLatest("deleteTask", deleteTask);
  yield debounce(500, "searchTasks", handleSearchTasks); // Debounced search
}
