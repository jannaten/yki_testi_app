import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    loading: false,
    errors: null,
    content: null,
    callback: null,
    options: {},
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.content = payload.content;
      if (payload.callback) state.callback = payload.callback;
      if (payload.options) state.options = payload.options;

      state.loading = false;
    },
    closeModal: (state) => {
      state.content = null;
      state.callback = null;
      state.options = {};
      state.loading = false;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
