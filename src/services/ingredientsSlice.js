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
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "";
      });
  },
});
export const { getIngredientData, toggleIngredientsTab } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
