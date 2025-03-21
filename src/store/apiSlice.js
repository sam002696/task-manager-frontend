import { createSlice } from "@reduxjs/toolkit";

// Defining the initial state using that type
const initialState = {
  loading: false,
  success: false,
  error: null,
  operationId: "",
  parameters: {},
  output: {}, // Stores API responses dynamically
};

// Creating a slice for the API state
export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    // Reducer for making an API request
    callApi: (state, { payload }) => ({
      ...state,
      loading: true,
      operationId: payload.operationId,
      parameters: payload.parameters || {},
    }),
    // Reducer for handling a successful API response
    succeed: (state, { payload }) => {
      const output = payload.output || "output";
      return {
        ...state,
        loading: false,
        [output]: payload.response,
        success: true,
      };
    },
    // Reducer for handling a failed API response
    failed: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error,
      success: false,
    }),
    // Reducer for clearing the API
    clearState: (state, { payload }) => {
      const output = payload.output || "output";
      return {
        ...state,
        [output]: {},
      };
    },
  },
});

// Exporting the actions from the slice
export const { callApi, succeed, failed, clearState } = apiSlice.actions;
export const selectApi = (state) => state.api;
export default apiSlice.reducer;
