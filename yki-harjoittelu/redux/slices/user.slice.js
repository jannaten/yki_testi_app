import axios from "axios";
import { api } from "../../config";
import jwt_decode from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorToast } from "../../components/common/toast.component";

export const loadUser = createAsyncThunk(
	"user/loadUser",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.post(api.userByToken, {
				"x-auth-token": localStorage.token,
			});
			return response.data;
		} catch (error) {
			localStorage.removeItem("token");
			return rejectWithValue(error.response.data);
		}
	}
);

export const signInOrUp = createAsyncThunk(
	"user/signInOrUp",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(api.userSignIn, data);
			localStorage.setItem("token", response.data.token);
			return jwt_decode(response.data.token);
		} catch (error) {
			errorToast(error.response.data.message);
			return rejectWithValue(error.response.data);
		}
	}
);

export const userUpdate = createAsyncThunk(
	'user/userUpdate',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.patch(api.userUpdate, data);
			return jwt_decode(response.data.token);
		} catch (error) {
			errorToast(error.response.data.message);
			return rejectWithValue(error.response.data);
		}
	}
)

const isPendingAction = (action) => {
	return action.type.startsWith("user/") && action.type.endsWith("/pending");
};

const isRejectedAction = (action) => {
	return action.type.startsWith("user/") && action.type.endsWith("/rejected");
};

const INITIAL_SIGN_IN_DATA = {
	email: "",
	password: "",
};

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		errors: false,
		loading: false,
		initialInputValues: INITIAL_SIGN_IN_DATA,
	},
	reducers: {
		onHandleUserValueChange: (state, { payload }) => {
			state.initialInputValues = {
				...state.initialInputValues,
				[payload.target.name]: payload.target.value,
			};
		},
		onClearUserValue: (state, action) => {
			state.user = null;
			state.initialInputValues = INITIAL_SIGN_IN_DATA;
		},
	},
	extraReducers: (builder) => {
		builder
			// LOAD
			.addCase(loadUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.initialInputValues = INITIAL_SIGN_IN_DATA;
				state.loading = false;
			})
			// ADD / ACCESS
			.addCase(signInOrUp.fulfilled, (state, action) => {
				state.user = action.payload;
				state.initialInputValues = INITIAL_SIGN_IN_DATA;
				state.loading = false;
			})
			// UPDATE
			.addCase(userUpdate.fulfilled, (state, action) => {
				state.user = action.payload;
				state.initialInputValues = INITIAL_SIGN_IN_DATA;
				state.loading = false;
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

export const { onHandleUserValueChange, onClearUserValue } = userSlice.actions;

export default userSlice.reducer;
