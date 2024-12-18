import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reHeader } from "./dinamik-header";

export const store = configureStore({
  reducer: combineReducers({
    header: reHeader,
  }),
});
