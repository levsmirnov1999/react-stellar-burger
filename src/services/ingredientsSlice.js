import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "./ingredientsQuery";

const initialState = {
  ingredients: [],
  isLoading: false,
  error: "",
  ingredientsCurrentTab: "bun",
  ingredientDetails: {
    ingredient: null,
  },
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getIngredientData: (state, action) => {
      state.ingredientDetails.ingredient = action.payload;
    },
    toggleIngredientsTab: (state, action) => {
      state.ingredientsCurrentTab = action.payload;
    },
  },
  extraReducers: {
    [fetchIngredients.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.ingredients = action.payload;
    },
    [fetchIngredients.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchIngredients.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
  },
});
export const { getIngredientData, toggleIngredientsTab } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
