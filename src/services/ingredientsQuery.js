import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/utils";

export const fetchIngredients = createAsyncThunk(
  "ingredients/get",
  async (_, thunkApi) => {
    const response = await fetch(`${BASE_URL}/ingredients`);
    const ingredients = await response.json();
    return ingredients.data;
  }
);
