import { configureStore } from "@reduxjs/toolkit";
import localizationSlice from "./slices/localization.slice";
import modalSlice from "./slices/modal.slice";

const store = configureStore({
  reducer: {
    localization: localizationSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
