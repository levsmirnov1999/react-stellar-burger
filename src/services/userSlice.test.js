import userReducer, { setAuthChecked, initialState } from "./userSlice";
import {
  register,
  login,
  logout,
  fetchUserData,
  updateUserData,
  initiatePasswordReset,
  confirmPasswordReset,
} from "./userQuery";

const testUser = { name: "Test User", email: "test@example.com" };

describe("userReducer", () => {
  it("должен обработать начальное состояние", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен обрабатывать setAuthChecked", () => {
    expect(userReducer(initialState, setAuthChecked())).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it("должен обрабатывать register.fulfilled", () => {
    const testAction = {
      type: register.fulfilled.type,
      payload: { user: testUser, accessToken: "testToken" },
    };
    expect(userReducer(initialState, testAction)).toEqual({
      ...initialState,
      user: testUser,
      accessToken: "testToken",
      status: "succeeded",
      isAuthChecked: true,
    });
  });

  it("должен обрабатывать login.fulfilled", () => {
    const testAction = {
      type: login.fulfilled.type,
      payload: { user: testUser, accessToken: "testToken" },
    };
    expect(userReducer(initialState, testAction)).toEqual({
      ...initialState,
      user: testUser,
      accessToken: "testToken",
      status: "succeeded",
      isAuthChecked: true,
    });
  });

  it("должен обрабатывать logout.fulfilled", () => {
    const testAction = {
      type: logout.fulfilled.type,
      payload: { user: testUser, accessToken: "testToken" },
    };
    expect(userReducer(initialState, testAction)).toEqual({
      ...initialState,
      user: null,
      accessToken: null,
      status: "idle",
      isAuthChecked: true,
    });
  });

  it("должен обрабатывать fetchUserData.fulfilled", () => {
    const testUser = { name: "Fetched User", email: "fetched@example.com" };
    const testAction = {
      type: fetchUserData.fulfilled.type,
      payload: testUser,
    };
    expect(userReducer(initialState, testAction)).toEqual({
      ...initialState,
      user: testUser,
      isAuthChecked: true,
    });
  });

  it("должен обрабатывать updateUserData.fulfilled", () => {
    const updatedUser = { name: "Updated User", email: "updated@example.com" };
    const testAction = {
      type: updateUserData.fulfilled.type,
      payload: updatedUser,
    };
    expect(userReducer(initialState, testAction)).toEqual({
      ...initialState,
      user: updatedUser,
    });
  });

  it("должен обрабатывать initiatePasswordReset.fulfilled", () => {
    const testAction = {
      type: initiatePasswordReset.fulfilled.type,
    };
    expect(userReducer(initialState, testAction)).toEqual({
      ...initialState,
      passwordResetStatus: "succeeded",
    });
  });

  it("должен обрабатывать confirmPasswordReset.fulfilled", () => {
    const testAction = {
      type: confirmPasswordReset.fulfilled.type,
    };
    expect(userReducer(initialState, testAction)).toEqual({
      ...initialState,
      passwordResetStatus: "succeeded",
    });
  });

  it("должен обрабатывать любое действие с /pending", () => {
    const action = { type: "auth/someAction/pending" };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      status: "loading",
    });
  });

  it("должен обрабатывать любое действие с /rejected", () => {
    const action = { type: "auth/someAction/rejected", payload: "Test error" };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      status: "failed",
      error: "Test error",
    });
  });
});
