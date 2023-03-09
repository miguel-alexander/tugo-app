import { configureStore } from "@reduxjs/toolkit";
import AppReducers from "./RootReducer";
import { persistStore } from "redux-persist";

const Store = configureStore({
  reducer: AppReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default Store;
export const Persistor = persistStore(Store);
