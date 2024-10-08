import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

// export const store = configureStore({
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
