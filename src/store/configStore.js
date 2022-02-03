import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import api from "./middeware/api";
import apiLogin from "./middeware/loginApi";
import reducer from "./reducer";

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), thunk, api, apiLogin],
});

// const store = configureStore({ reducer, middleware: [logger], func });

export default store;
