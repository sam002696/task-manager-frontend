import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem("token", payload.token); //  Store token for persistence
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); //  Clear token on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
