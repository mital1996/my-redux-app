import _ from "lodash";
import { configureStore } from "@reduxjs/toolkit";

import modalReducer, { modalSlice } from "./modalSlice";
import authReducer, { authSlice } from "./authSlice";

import { authApi } from "../api/login";
import { standardApi } from "../api/standard";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [standardApi.reducerPath]: standardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(standardApi.middleware),
});

const createActions = (slice) =>
  _.mapValues(
    slice.actions,
    (actionCreator) => (payload) => store.dispatch(actionCreator(payload))
  );

export const actions = {
  modal: createActions(modalSlice),
  auth: createActions(authSlice),
};
