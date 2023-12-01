import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredientsSlice";
import modalSlice from "./modalSlice";
import constructorSlice from "./constructorSlice";
import userSlice from "./userSlice";
import { TFeedActions, feedActions } from "./webSockets/actions/feed";
import {
  TOrderHistoryActions,
  orderHistoryActions,
} from "./webSockets/actions/orderHistory";
import { feedReducer } from "./webSockets/reducers/feed";
import { socketMiddleware } from "./webSockets/middleware/socketMiddleware";
import { orderHistoryReducer } from "./webSockets/reducers/orderHistory";

const rootReducer = combineReducers({
  ingredientsSlice,
  modalSlice,
  constructorSlice,
  userSlice,
  feedReducer,
  orderHistoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(feedActions),
      socketMiddleware(orderHistoryActions)
    ),
});

export type TWsApplicationActions = TFeedActions | TOrderHistoryActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
