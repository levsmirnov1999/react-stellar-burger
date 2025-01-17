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
import { TUser } from "../utils/types";

interface IUserState {
  user: TUser | null;
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  passwordResetStatus: "idle" | "succeeded";
  passwordResetError: string | null;
  isAuthChecked: boolean;
}

export const initialState: IUserState = {
  user: null,
  accessToken: getFromLocalStorage().accessToken || null,
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
        state.isAuthChecked = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.user = null;
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
