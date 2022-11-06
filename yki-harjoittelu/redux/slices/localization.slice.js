import axios from "axios";
import { api } from "../../config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorToast } from "../../components/common/toast.component";
import { successToast } from "../../components/common/toast.component";

export const loadTranslations = createAsyncThunk(
	"localization/loadTranslations",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(api.localizationKeyValues);
			return response.data;
		} catch (error) {
			errorToast(error.response.data.message);
			return rejectWithValue(error.response.data);
		}
	}
);

export const loadLanguages = createAsyncThunk(
	"localization/loadLanguages",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(api.localizationLocales);
			return response.data;
		} catch (error) {
			errorToast(error.response.data.message);
			return rejectWithValue(error.response.data);
		}
	}
);

export const addTranslation = createAsyncThunk(
	"localization/addTranslation",
	async (data, { rejectWithValue }) => {
		try {
			const respond = await axios.post(api.localizationKeyValues, data);
			successToast("translation added");
			return respond.data;
		} catch (error) {
			errorToast(error.response.data.message);
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const editKeyValues = createAsyncThunk(
	"localization/editKeyValues",
	async (data, { rejectWithValue }) => {
		try {
			const respond = await axios.put(
				api.localizationKeyValuesById(data._id),
				data
			);
			successToast("translation edited");
			return respond.data;
		} catch (error) {
			errorToast(error.response.data.message);
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteTranslation = createAsyncThunk(
	"localization/deleteTranslation",
	async (_id, { rejectWithValue }) => {
		try {
			const respond = await axios.delete(api.localizationKeyValuesById(_id));
			errorToast("translation deleted");
			return respond.data;
		} catch (error) {
			errorToast(error.response.data.message);
			return rejectWithValue(error.response.data);
		}
	}
);

const isPendingAction = (action) => {
	return (
		action.type.startsWith("localization/") && action.type.endsWith("/pending")
	);
};

const isRejectedAction = (action) => {
	return (
		action.type.startsWith("localization/") && action.type.endsWith("/rejected")
	);
};

const localizationSlice = createSlice({
	name: "localization",
	initialState: {
		errors: false,
		loading: false,
		languages: [],
		searchField: "",
		translations: [],
		keyValuesInput: {},
		defaultInputValue: {},
		enableKeyEditing: false,
		localeValueInputPair: [],
		keyValueChangeInputValue: {},
	},
	reducers: {
		handleTranslationValueChange: (state, { payload }) => {
			let copy = [...state.localeValueInputPair];
			const { event: e, _id: language } = payload;
			const name = e.target.value;
			state.defaultInputValue = {
				...state.defaultInputValue,
				[e.target.name]: name,
			};
			if (!copy.some((el) => el.language === language)) {
				copy = [...copy, { name, language }];
				state.localeValueInputPair = copy;
				return;
			}
			if (copy.some((el) => el.name !== name)) {
				copy.map((el) => {
					if (el.language === language) el.name = name;
					return el;
				});
				return;
			}
		},
		translationInputReset: (state, action) => {
			state.keyValuesInput = {};
			state.defaultInputValue = {};
			state.enableKeyEditing = false;
			state.localeValueInputPair = [];
			state.keyValueChangeInputValue = {};
		},
		handleEnableKeyEditing: (state, action) => {
			state.enableKeyEditing = !state.enableKeyEditing;
		},
		handleKeyValueChange: (state, action) => {
			state.keyValueChangeInputValue = action.payload;
		},
		onKeyValueChange: (state, { payload }) => {
			const { eventValue, locale, isKey } = payload;
			const initialKeyValues = JSON.parse(
				JSON.stringify(state.keyValueChangeInputValue)
			);
			if (!isKey) {
				initialKeyValues.locale_values.filter((value) => {
					if (value.language.locale === locale.locale) {
						value.name = eventValue;
					}
					return value;
				});
				state.keyValueChangeInputValue = initialKeyValues;
			} else {
				initialKeyValues.key = eventValue;
				state.keyValueChangeInputValue = initialKeyValues;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// LOAD
			.addCase(loadLanguages.fulfilled, (state, action) => {
				state.languages = action.payload;
				state.loading = false;
			})
			// LOAD
			.addCase(loadTranslations.fulfilled, (state, action) => {
				state.translations = action.payload;
				state.loading = false;
			})
			// ADD
			.addCase(addTranslation.fulfilled, (state, action) => {
				state.translations = [...state.translations, action.payload];
				state.loading = false;
			})
			// UPDATE
			.addCase(editKeyValues.fulfilled, (state, { payload }) => {
				state.translations = state.translations.map((el) => {
					if (el._id === payload._id) el = payload;
					return el;
				});
			})
			// DELETE ALL
			.addCase(deleteTranslation.fulfilled, (state, { payload }) => {
				state.translations = state.translations.filter(
					(el) => el._id !== payload._id
				);
			})
			// LOADING / PENDING
			.addMatcher(isPendingAction, (state) => {
				state.loading = true;
				state.errors = false;
			})
			// ERROR /FAILURE / REJECTED
			.addMatcher(isRejectedAction, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			});
	},
});

export const {
	handleTranslationValueChange,
	handleEnableKeyEditing,
	translationInputReset,
	handleKeyValueChange,
	onKeyValueChange,
} = localizationSlice.actions;

export default localizationSlice.reducer;
