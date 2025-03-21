import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  tasks: [], // List of tasks
  loading: false,
  error: null,
  filters: {
    // Filters to apply to tasks
    status: "All",
    sort: "newest",
    search: "",
    due_date_from: null,
    due_date_to: null,
  },
  activeFilterCount: 2, // Default: "All" & "newest"
  taskCounts: {
    // Count of tasks in each status
    "To Do": 0,
    "In Progress": 0,
    Done: 0,
  },
};

// Sorting Function
const sortTasks = (tasks, sortOrder) => {
  // Sorting tasks based on the created_at date
  // If sortOrder is "newest", sorting in descending order
  // If sortOrder is "oldest", sorting in ascending order
  // Using the Date constructor to convert the created_at date string to a Date object
  return tasks.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });
};

// Filtering Function
const filterTasks = (tasks, filters) => {
  let filteredTasks = tasks;

  // Filtering tasks based on the search term
  if (filters.status !== "All" && filters.status !== "") {
    filteredTasks = filteredTasks.filter(
      (task) => task.status === filters.status
    );
  }

  // Filtering tasks based on the search term
  if (filters.due_date_from && filters.due_date_to) {
    const from = new Date(filters.due_date_from).getTime();
    const to = new Date(filters.due_date_to).getTime();

    // Filtering tasks based on the due date range
    filteredTasks = filteredTasks.filter((task) => {
      const taskDate = new Date(task.due_date).getTime();
      return taskDate >= from && taskDate <= to;
    });
  }

  // Filtering tasks based on the search term
  return sortTasks(filteredTasks, filters.sort);
};

// Function to Calculate Active Filters
const calculateActiveFilterCount = (filters) => {
  const defaultFilterCount = 2; // "status" and "sort" are always set here

  // Filtering out the default filters
  const additionalFilters = Object.entries(filters).filter(([key, val]) => {
    return (
      val &&
      key !== "status" &&
      key !== "sort" &&
      key !== "due_date_from" &&
      key !== "due_date_to"
    );
  }).length;

  // Counting date filters as 1 only when both are set
  const dateRangeSelected =
    filters.due_date_from && filters.due_date_to ? 1 : 0;

  // Returning the total count of active filters
  return defaultFilterCount + additionalFilters + dateRangeSelected;
};

// Function to Calculate Task Counts
const calculateTaskCounts = (tasks) => {
  // Counting the number of tasks in each status
  return {
    "To Do": tasks.filter((task) => task.status === "To Do").length,
    "In Progress": tasks.filter((task) => task.status === "In Progress").length,
    Done: tasks.filter((task) => task.status === "Done").length,
  };
};

// Task Slice
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Reducer to set loading state
    setLoading: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    // Reducer to set error state
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    // Reducer to set tasks
    setTasks: (state, { payload }) => {
      // Updating the tasks state
      state.tasks = filterTasks(payload, state.filters);
      state.taskCounts = calculateTaskCounts(state.tasks);
      state.loading = false;
    },

    // Reducer to add a task locally
    addTaskLocal: (state, { payload }) => {
      // Checking if the task already
      const isDuplicate = state.tasks.some((task) => task.id === payload.id);
      // If the task is not a duplicate, adding it
      if (!isDuplicate) {
        state.tasks.push(payload);
        state.tasks = sortTasks(state.tasks, state.filters.sort);
        state.taskCounts = calculateTaskCounts(state.tasks);
      }
      state.loading = false;
    },

    // Reducer to update a task locally
    updateTaskLocal: (state, { payload }) => {
      // Finding the index of the task to update
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      // If the task exists, updating it
      if (index !== -1) {
        // Updating the task with the new data
        state.tasks[index] = { ...state.tasks[index], ...payload };
        state.tasks = sortTasks(state.tasks, state.filters.sort);
        state.taskCounts = calculateTaskCounts(state.tasks);
      }
      state.loading = false;
    },

    // Reducer to delete a task locally
    deleteTaskLocal: (state, { payload }) => {
      // Filtering out the task to delete
      state.tasks = state.tasks.filter((task) => task.id !== payload);
      state.taskCounts = calculateTaskCounts(state.tasks);
      state.loading = false;
    },

    // Reducer to set filters
    setFilters: (state, { payload }) => {
      // Updating the filters state
      state.filters = { ...state.filters, ...payload };
      state.activeFilterCount = calculateActiveFilterCount(state.filters);
    },
  },
});

export const {
  setTasks,
  addTaskLocal,
  updateTaskLocal,
  deleteTaskLocal,
  clearLoading,
  setFilters,
  setLoading,
  setError,
} = taskSlice.actions;
export default taskSlice.reducer;
