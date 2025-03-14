import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "", // "success", "error", "info", etc.
  message: "", // Toast message
};

export const toastAlertSlice = createSlice({
  name: "toastAlert",
  initialState,
  reducers: {
    setToastAlert: (state, { payload }) => {
      return {
        type: payload.type,
        message: payload.message,
      };
    },
    clearToastAlert: () => {
      return {
        type: "",
        message: "",
      };
    },
  },
});

export const { setToastAlert, clearToastAlert } = toastAlertSlice.actions;
export const selectToastAlert = (state) => state.toastAlert;
export default toastAlertSlice.reducer;
