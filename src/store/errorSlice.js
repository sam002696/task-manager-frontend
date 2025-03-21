import { createSlice } from "@reduxjs/toolkit";

// Initial state
// The initial state of the toast alert slice is an object with type and message properties set to an empty string.
// This object represents the toast alert that will be displayed to the user.
// The type property is used to determine the appearance of the toast alert (e.g., success, error, warning).
// The message property contains the text that will be displayed in the toast alert.
const initialState = {
  type: "",
  message: "",
};

export const toastAlertSlice = createSlice({
  name: "toastAlert", // Slice name
  initialState,
  reducers: {
    setToastAlert: (state, { payload }) => {
      // Reducer function to set the toast alert
      return {
        type: payload.type,
        message: payload.message,
      };
    },
    clearToastAlert: () => {
      // Reducer function to clear the toast
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
