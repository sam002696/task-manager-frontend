import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
  operationId: "",
  parameters: {},
  output: {}, // Stores API responses dynamically
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    callApi: (state, { payload }) => ({
      ...state,
      loading: true,
      operationId: payload.operationId,
      parameters: payload.parameters || {},
    }),
    succeed: (state, { payload }) => {
      const output = payload.output || "output";
      return {
        ...state,
        loading: false,
        [output]: payload.response,
        success: true,
      };
    },
    failed: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error,
      success: false,
    }),
    clearState: (state, { payload }) => {
      const output = payload.output || "output";
      return {
        ...state,
        [output]: {},
      };
    },
  },
});

export const { callApi, succeed, failed, clearState } = apiSlice.actions;
export default apiSlice.reducer;
