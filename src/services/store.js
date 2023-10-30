import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice";
import modalSlice from "./modalSlice";
import constructorSlice from "./constructorSlice";

const rootReducer = combineReducers({
  ingredientsSlice,
  modalSlice,
  constructorSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
