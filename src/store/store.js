import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";
import toastAlertReducer from "./errorSlice";
import rootSaga from "../sagas/rootSaga";
import apiReducer from "./apiSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    toastAlert: toastAlertReducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
