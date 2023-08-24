import { configureStore } from "@reduxjs/toolkit";
import wineReducer from "./features/wine.slice";

const rootReducer = {
  wine: wineReducer,
};

// Redux store
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

// Root State type
export type RootState = ReturnType<typeof store.getState>;

// Dispatch type
export type AppDispatch = typeof store.dispatch;
