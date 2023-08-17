import {
  //   legacy_createStore as createStore,
  Store,
  //   applyMiddleware,
  combineReducers,
} from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import { createWrapper, Context } from "next-redux-wrapper";
// import { composeWithDevTools } from '@redux-devtools/extension';
import { wineReducer } from "./reducers/wineReducer";

// Create middleware
// const middleware = composeWithDevTools(applyMiddleware(...[thunk]));

// Combine reducers
// const rootReducer = combineReducers<RootState>({
//   wine: wineReducer,
// });
const rootReducer = {
  wine: wineReducer,
};

// Redux store
export const store = configureStore({
  reducer: rootReducer,
});

// Root state type
// export type RootState = {
//     wine: WineState;
//   };
export type RootState = ReturnType<typeof store.getState>;
// Dispatch type
export type AppDispatch = typeof store.dispatch;

// Create a make store function
const makeStore = (context: Context) => store;
// const makeStore = (context: Context) => createStore(rootReducer, middleware);

const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });

export default wrapper;
