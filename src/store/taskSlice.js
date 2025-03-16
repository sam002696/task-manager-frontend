import { createSlice } from "@reduxjs/toolkit";

const initialState = { tasks: [], loading: false, error: null };

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, { payload }) => {
      state.tasks = payload.sort(
        (a, b) => new Date(b.due_date) - new Date(a.due_date)
      );
    },
    addTaskLocal: (state, { payload }) => {
      const isDuplicate = state.tasks.some((task) => task.id === payload.id);
      if (!isDuplicate) {
        state.tasks.push(payload);
      }
    },
    updateTaskLocal: (state, { payload }) => {
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...payload };
      }
    },
    deleteTaskLocal: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },
  },
});

export const { setTasks, addTaskLocal, updateTaskLocal, deleteTaskLocal } =
  taskSlice.actions;
export default taskSlice.reducer;
