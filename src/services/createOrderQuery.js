import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, checkResponse } from "../utils/utils";

export const createOrder = createAsyncThunk(
  "burgerConstructor/createOrder",
  async (ingredients) => {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    const data = await checkResponse(response);
    return data;
  }
);
