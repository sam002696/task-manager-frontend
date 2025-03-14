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
      console.log(payload);
      state.user = payload?.data?.user;
      state.token = payload?.data?.token;
      localStorage.setItem("user", JSON.stringify(payload?.data));
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
