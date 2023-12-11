import { TFeed } from "../../../utils/types";
import {
  FEED_CLOSE,
  FEED_CLOSED,
  FEED_ERROR,
  FEED_GET_MESSAGE,
  FEED_START,
  FEED_SUCCESS,
} from "../constants";
import { TWsActions } from "../middleware/socketMiddleware";

export interface IFeedStart {
  readonly type: typeof FEED_START;
  readonly payload: string;
}

export interface IFeedClose {
  readonly type: typeof FEED_CLOSE;
  readonly payload: string;
}

export interface IFeedSuccess {
  readonly type: typeof FEED_SUCCESS;
  readonly payload: Event;
}

export interface IFeedError {
  readonly type: typeof FEED_ERROR;
  readonly payload: Event;
}

export interface IFeedClosed {
  readonly type: typeof FEED_CLOSED;
  readonly payload: Event;
}

export interface IFeedGetMessage {
  readonly type: typeof FEED_GET_MESSAGE;
  readonly payload: TFeed;
}

export type TFeedActions =
  | IFeedStart
  | IFeedClose
  | IFeedSuccess
  | IFeedError
  | IFeedClosed
  | IFeedGetMessage;

export const feedStart = (Url: string) => {
  return {
    type: FEED_START,
    payload: Url,
  };
};

export const feedClose = (reason: string) => {
  return {
    type: FEED_CLOSE,
    payload: reason,
  };
};

export const feedActions: TWsActions = {
  init: FEED_START,
  success: FEED_SUCCESS,
  closed: FEED_CLOSED,
  error: FEED_ERROR,
  close: FEED_CLOSE,
  message: FEED_GET_MESSAGE,
};
