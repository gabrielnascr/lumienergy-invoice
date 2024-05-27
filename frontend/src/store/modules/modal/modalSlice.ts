import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalContainer: null,
  dataId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      state.isModalOpen = true;
      state.modalContainer = action.payload.container;
      state.dataId = action.payload.dataId;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalContainer = null;
      state.dataId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
