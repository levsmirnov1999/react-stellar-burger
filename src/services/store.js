import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice";
import modalSlice from "./modalSlice";
import constructorSlice from "./constructorSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  ingredientsSlice,
  modalSlice,
  constructorSlice,
  userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
