import { createSlice } from "@reduxjs/toolkit";

const initialState = { tasks: [], loading: false, error: null };

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, { payload }) => {
      state.tasks = payload;
    },
    addTaskLocal: (state, { payload }) => {
      state.tasks.push(payload);
    },
    updateTaskLocal: (state, { payload }) => {
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      if (index !== -1) state.tasks[index] = payload;
    },
    deleteTaskLocal: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },
  },
});

export const { setTasks, addTaskLocal, updateTaskLocal, deleteTaskLocal } =
  taskSlice.actions;
export default taskSlice.reducer;
