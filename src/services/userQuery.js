import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, checkResponse } from "../utils/utils";

export const saveToLocalStorage = ({ accessToken, refreshToken }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const removeFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getFromLocalStorage = () => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await checkResponse(response);
    saveToLocalStorage({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    return data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await checkResponse(response);
    saveToLocalStorage({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const { refreshToken } = getFromLocalStorage();
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  });
  const data = await checkResponse(response);
  removeFromLocalStorage();
  return data;
});

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { getState }) => {
    const { accessToken } = getState().userSlice;
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    const data = await checkResponse(response);
    return data.user;
  }
);

export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (userUpdateData, { getState }) => {
    const { accessToken } = getState().userSlice;
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(userUpdateData),
    });

    const data = await checkResponse(response);
    return data.user;
  }
);

export const initiatePasswordReset = createAsyncThunk(
  "auth/initiatePasswordReset",
  async (email) => {
    const response = await fetch(`${BASE_URL}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await checkResponse(response);
    return data;
  }
);

export const confirmPasswordReset = createAsyncThunk(
  "auth/confirmPasswordReset",
  async ({ password, token }) => {
    const response = await fetch(`${BASE_URL}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    });
    const data = await checkResponse(response);
    return data;
  }
);
