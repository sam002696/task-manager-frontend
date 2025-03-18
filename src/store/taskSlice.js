import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: { status: "All", sort: "newest", search: "" },
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
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ); // Newest First
      } else if (state.filters.sort === "oldest") {
        filteredTasks.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
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
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        } else if (state.filters.sort === "oldest") {
          state.tasks.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
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
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        } else if (state.filters.sort === "oldest") {
          state.tasks.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );
        }
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
