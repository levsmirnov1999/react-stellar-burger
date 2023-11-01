import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
  orderNumber: null,
  orderError: null,
};

const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = {
        ...action.payload.ingredient,
        uniqueId: uuidv4(),
      };
      const ingredientPrice = ingredient.price;

      if (ingredient.type === "bun") {
        if (state.bun) {
          state.totalPrice -= state.bun.price * 2;
        }
        state.bun = ingredient;
        state.totalPrice += ingredientPrice * 2;
      } else {
        state.ingredients.push(ingredient);
        state.totalPrice += ingredientPrice;
      }
    },

    removeIngredient: (state, action) => {
      const index = state.ingredients.findIndex(
        (ing) => ing.uniqueId === action.payload.ingredient.uniqueId
      );
      if (index !== -1) {
        state.totalPrice -= state.ingredients[index].price;
        state.ingredients.splice(index, 1);
      }
    },

    resetConstructor: (state) => {
      return initialState;
    },
    moveIngredient: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.ingredients.splice(oldIndex, 1);
      state.ingredients.splice(newIndex, 0, removed);
    },
    saveOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },
    setOrderError: (state, action) => {
      state.orderError = action.payload;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveIngredient,
  saveOrderNumber,
  setOrderError,
} = constructorSlice.actions;
export default constructorSlice.reducer;
