import { createSlice } from "@reduxjs/toolkit";

interface IModalState {
  ingredientDetails: {
    isOpened: boolean;
  };
  orderDetails: {
    isOpened: boolean;
  };
}

export const initialState: IModalState = {
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
    closeAllModals: (state) => {
      state.ingredientDetails.isOpened = false;
      state.orderDetails.isOpened = false;
    },
    openIngredient: (state) => {
      state.ingredientDetails.isOpened = true;
    },
    openOrderModal: (state) => {
      state.orderDetails.isOpened = true;
    },
  },
});

export const { closeAllModals, openIngredient, openOrderModal } =
  modalSlice.actions;
export default modalSlice.reducer;
