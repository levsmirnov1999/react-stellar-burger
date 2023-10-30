import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [],
  orderNumber: null,
  success: false,
  errorMessage: null,
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === "bun") {
        state.bun = action.payload;
      } else {
        state.ingredients = [action.payload, ...state.ingredients];
      }
    },
    moveIngredient: (state, action) => {
      const ingredients = [...state.ingredients];
      ingredients.splice(
        action.payload.hoverIndex,
        0,
        ingredients.splice(action.payload.dragIndex, 1)[0]
      );
      state.ingredients = ingredients;
    },
    removeIngredient: (state, action) => {
      state.ingredients = [...state.ingredients].filter(
        (item, index) => index !== action.payload
      );
    },
    saveOrderNumber: (state, action) => {
      state.orderNumber = action.payload.order.number;
      state.ingredients = [];
      state.bun = null;
      state.success = true;
    },
    statusSuccess: (state, action) => {
      state.errorMessage = action.payload;
      state.success = false;
      state.orderNumber = null;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  saveOrderNumber,
  statusSuccess,
} = constructorSlice.actions;
export default constructorSlice.reducer;
