import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientsDetails: {
    isOpened: false,
  },
  orderDetails: {
    isOpened: false,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeAllModals: (state, action) => {
      state.ingredientsDetails.isOpened = false;
      state.orderDetails.isOpened = false;
    },
    openIngredient: (state, action) => {
      state.ingredientsDetails.isOpened = true;
    },
    openOrderModal: (state, action) => {
      state.orderDetails.isOpened = true;
    },
  },
});

export const { closeAllModals, openIngredient, openOrderModal } =
  modalSlice.actions;
export default modalSlice.reducer;
