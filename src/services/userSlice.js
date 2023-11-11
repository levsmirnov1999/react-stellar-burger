import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const saveToLocalStorage = ({ accessToken, refreshToken }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const removeFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const getFromLocalStorage = () => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Не удалось зарегистрироваться.");
      saveToLocalStorage({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Не удалось войти в систему.");
      saveToLocalStorage({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { refreshToken } = getFromLocalStorage();
      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: refreshToken }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Не удалось выйти из системы.");
      removeFromLocalStorage();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().userSlice;
      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.message || "Не удалось получить данные пользователя."
        );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (userUpdateData, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().userSlice;
      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/user",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          body: JSON.stringify(userUpdateData),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.message || "Не удалось обновить данные пользователя."
        );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const initiatePasswordReset = createAsyncThunk(
  "auth/initiatePasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/password-reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.message || "Не удалось отправить письмо для сброса пароля."
        );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const confirmPasswordReset = createAsyncThunk(
  "auth/confirmPasswordReset",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/password-reset/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, token }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Не удалось сбросить пароль.");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
