import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: { status: "All", sort: "newest" },
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, { payload }) => {
      let filteredTasks = payload;

      if (state.filters.status !== "All" && state.filters.status !== "") {
        filteredTasks = filteredTasks.filter(
          (task) => task.status === state.filters.status
        );
      }

      if (state.filters.sort === "newest") {
        filteredTasks.sort(
          (a, b) => new Date(b.due_date) - new Date(a.due_date)
        ); // Newest First
      } else if (state.filters.sort === "oldest") {
        filteredTasks.sort(
          (a, b) => new Date(a.due_date) - new Date(b.due_date)
        ); // Oldest First
      }

      state.tasks = filteredTasks;
    },
    addTaskLocal: (state, { payload }) => {
      const isDuplicate = state.tasks.some((task) => task.id === payload.id);
      if (!isDuplicate) {
        state.tasks.push(payload);

        // Applying sorting after adding the task
        if (state.filters.sort === "newest") {
          state.tasks.sort(
            (a, b) => new Date(b.due_date) - new Date(a.due_date)
          );
        } else if (state.filters.sort === "oldest") {
          state.tasks.sort(
            (a, b) => new Date(a.due_date) - new Date(b.due_date)
          );
        }
      }
    },

    updateTaskLocal: (state, { payload }) => {
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...payload };

        // Applying sorting after updating the task
        if (state.filters.sort === "newest") {
          state.tasks.sort(
            (a, b) => new Date(b.due_date) - new Date(a.due_date)
          );
        } else if (state.filters.sort === "oldest") {
          state.tasks.sort(
            (a, b) => new Date(a.due_date) - new Date(b.due_date)
          );
        }
      }
    },

    deleteTaskLocal: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },
    setFilters: (state, { payload }) => {
      state.filters = payload;
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
