import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientDetails: {
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
      state.ingredientDetails.isOpened = false;
      state.orderDetails.isOpened = false;
    },
    openIngredient: (state, action) => {
      state.ingredientDetails.isOpened = true;
    },
    openOrderModal: (state, action) => {
      state.orderDetails.isOpened = true;
    },
  },
});

export const { closeAllModals, openIngredient, openOrderModal } =
  modalSlice.actions;
export default modalSlice.reducer;
