import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import taskReducer from "./taskSlice";
import toastAlertReducer from "./errorSlice";
import rootSaga from "../sagas/rootSaga";
import apiReducer from "./apiSlice";

const sagaMiddleware = createSagaMiddleware();

// Creating the Redux store
export const store = configureStore({
  reducer: {
    tasks: taskReducer, // The taskSlice reducer is added to the store configuration under the tasks key
    toastAlert: toastAlertReducer, // The errorSlice reducer is added to the store configuration under the toastAlert key
    api: apiReducer, // The apiSlice reducer is added to the store configuration under the api key
  },
  // The store configuration is a key part of the Redux architecture,
  // as it defines how the application state is managed and updated.
  // The configureStore function from the Redux Toolkit library is used to create the store.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Running the root saga
// The sagaMiddleware.run function is called with the rootSaga as an argument.
// This starts the rootSaga and runs all the sagas in the application.
sagaMiddleware.run(rootSaga);

export default store;
