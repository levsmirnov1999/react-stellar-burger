import {
  FEED_CLOSE,
  FEED_CLOSED,
  FEED_ERROR,
  FEED_GET_MESSAGE,
  FEED_SUCCESS,
} from "../constants";
import { TFeed } from "../../../utils/types";

type TWSState = {
  wsConnected: boolean;
  orderFeed: TFeed | null;

  error?: Event;
};

const initialState = {
  wsConnected: false,
  orderFeed: null,
};

export const feedReducer = (
  state: TWSState = initialState,
  action: any
): TWSState => {
  switch (action.type) {
    case FEED_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case FEED_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case FEED_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case FEED_CLOSE:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case FEED_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orderFeed: action.payload,
      };
    default:
      return state;
  }
};
