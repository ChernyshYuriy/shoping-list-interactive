import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./middeware/api";
import reducer from "./reducer";

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), api],
});

// const store = configureStore({ reducer, middleware: [logger], func });

export default store;
