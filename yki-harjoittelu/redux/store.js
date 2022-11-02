import { configureStore } from "@reduxjs/toolkit";
import localizationSlice from "./slices/localization.slice";
import modalSlice from "./slices/modal.slice";
import userSlice from "./slices/user.slice";

const store = configureStore({
	reducer: {
		localization: localizationSlice,
		modal: modalSlice,
		user: userSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
