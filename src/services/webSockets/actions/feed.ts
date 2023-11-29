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

export type TFeedActions = IFeedStart | IFeedClose;

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
