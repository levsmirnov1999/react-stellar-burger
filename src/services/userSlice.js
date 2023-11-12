import { createSlice } from "@reduxjs/toolkit";
import {
  confirmPasswordReset,
  fetchUserData,
  getFromLocalStorage,
  initiatePasswordReset,
  login,
  logout,
  register,
  updateUserData,
} from "./userQuery";

const initialState = {
  user: null,
  accessToken: getFromLocalStorage().accessToken,
  status: "idle",
  error: null,
  passwordResetStatus: "idle",
  passwordResetError: null,
  isAuthChecked: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = "idle";
        state.isAuthChecked = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(initiatePasswordReset.fulfilled, (state, action) => {
        state.passwordResetStatus = "succeeded";
      })
      .addCase(confirmPasswordReset.fulfilled, (state, action) => {
        state.passwordResetStatus = "succeeded";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});
export const { setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
