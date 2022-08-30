import React from "react";
import ReactDOM from "react-dom/client";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";
import "./index.css";
import "antd/dist/antd.min.css";
import SessionReducer from "./redux/slices/sessionSlice";

/* A configuration object for the persistReducer function. */

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

/* Combining the reducers. */
const rootReducer = combineReducers({
  session: SessionReducer,
});

/* Creating a new reducer that is a wrapper around the rootReducer. This wrapper will intercept actions
and pass them to the rootReducer. It will also intercept actions that are dispatched by the
rootReducer and pass them to the storage engine. */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* Creating a store with the persistedReducer and the middleware. */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/* Creating a persistor object that is used by the PersistGate component. */
let persistor = persistStore(store);

/* Creating a root element for the ReactDOM.render() function. */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /* A wrapper around the App component that provides the store to the App component. */
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
