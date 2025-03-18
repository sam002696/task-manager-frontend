import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    status: "All",
    sort: "newest",
    search: "",
    due_date_from: null,
    due_date_to: null,
  },
};

// Sorting Function
const sortTasks = (tasks, sortOrder) => {
  return tasks.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });
};

// Filtering Function
const filterTasks = (tasks, filters) => {
  let filteredTasks = tasks;

  if (filters.status !== "All" && filters.status !== "") {
    filteredTasks = filteredTasks.filter(
      (task) => task.status === filters.status
    );
  }

  if (filters.due_date_from && filters.due_date_to) {
    const from = new Date(filters.due_date_from).getTime();
    const to = new Date(filters.due_date_to).getTime();

    filteredTasks = filteredTasks.filter((task) => {
      const taskDate = new Date(task.due_date).getTime();
      return taskDate >= from && taskDate <= to;
    });
  }

  return sortTasks(filteredTasks, filters.sort);
};

// Task Slice
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, { payload }) => {
      state.tasks = filterTasks(payload, state.filters);
    },

    addTaskLocal: (state, { payload }) => {
      const isDuplicate = state.tasks.some((task) => task.id === payload.id);
      if (!isDuplicate) {
        state.tasks.push(payload);
        state.tasks = sortTasks(state.tasks, state.filters.sort);
      }
    },

    updateTaskLocal: (state, { payload }) => {
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...payload };
        state.tasks = sortTasks(state.tasks, state.filters.sort);
      }
    },

    deleteTaskLocal: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },

    setFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload };
    },
  },
});

export const {
  setTasks,
  addTaskLocal,
  updateTaskLocal,
  deleteTaskLocal,
  setFilters,
} = taskSlice.actions;
export default taskSlice.reducer;
