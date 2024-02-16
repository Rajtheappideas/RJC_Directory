import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE } from "redux-persist";
import AuthSlice from "./AuthSlice";
import CmsSlice from "./CmsSlice";
import GlobalStates from "./GlobalStates";
import ReviewSlice from "./ReviewSlice";
import MerchantSlice from "./MerchantSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["auth"],
};
const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loading"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthSlice),
  cms: CmsSlice,
  global: GlobalStates,
  review: ReviewSlice,
  merchant: MerchantSlice,
});

const persisteRoot = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: { root: persisteRoot },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
