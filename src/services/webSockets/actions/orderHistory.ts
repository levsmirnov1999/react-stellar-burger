import { TFeed } from "../../../utils/types";
import {
  ORDER_HISTORY_CLOSE,
  ORDER_HISTORY_CLOSED,
  ORDER_HISTORY_ERROR,
  ORDER_HISTORY_GET_MESSAGE,
  ORDER_HISTORY_START,
  ORDER_HISTORY_SUCCESS,
} from "../constants";
import { TWsActions } from "../middleware/socketMiddleware";

export interface IOrderHistoryStart {
  readonly type: typeof ORDER_HISTORY_START;
  readonly payload: string;
}

export interface IOrderHistoryClose {
  readonly type: typeof ORDER_HISTORY_CLOSE;
  readonly payload: string;
}

export interface IOrderHistorySuccess {
  readonly type: typeof ORDER_HISTORY_SUCCESS;
  readonly payload: Event;
}

export interface IOrderHistoryError {
  readonly type: typeof ORDER_HISTORY_ERROR;
  readonly payload: Event;
}

export interface IOrderHistoryClosed {
  readonly type: typeof ORDER_HISTORY_CLOSED;
  readonly payload: Event;
}

export interface IOrderHistoryGetMessage {
  readonly type: typeof ORDER_HISTORY_GET_MESSAGE;
  readonly payload: TFeed;
}

export type TOrderHistoryActions =
  | IOrderHistoryStart
  | IOrderHistoryClose
  | IOrderHistorySuccess
  | IOrderHistoryError
  | IOrderHistoryClosed
  | IOrderHistoryGetMessage;

export const orderHistoryStart = (Url: string) => {
  return {
    type: ORDER_HISTORY_START,
    payload: Url,
  };
};

export const orderHistoryClose = (reason: string) => {
  return {
    type: ORDER_HISTORY_CLOSE,
    payload: reason,
  };
};

export const orderHistoryActions: TWsActions = {
  init: ORDER_HISTORY_START,
  success: ORDER_HISTORY_SUCCESS,
  closed: ORDER_HISTORY_CLOSED,
  error: ORDER_HISTORY_ERROR,
  close: ORDER_HISTORY_CLOSE,
  message: ORDER_HISTORY_GET_MESSAGE,
};
