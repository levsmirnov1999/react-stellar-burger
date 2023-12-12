import * as types from "../constants";
import { wsGetMessage } from "./feed.test";
import { orderHistoryReducer } from "./orderHistory";

describe("история заказов вебсокет", () => {
  it("should return the initial state", () => {
    expect(orderHistoryReducer(undefined, {})).toEqual({
      wsConnected: false,
      orderHistory: null,
    });
  });
  it("подключение вебсокета истории заказов", () => {
    expect(
      orderHistoryReducer(
        {
          wsConnected: false,
          orderHistory: null,
        },
        {
          type: types.ORDER_HISTORY_SUCCESS,
        }
      )
    ).toEqual({
      wsConnected: true,
      orderHistory: null,
    });
  });
  it("ошибка вебсокета истории заказов", () => {
    expect(
      orderHistoryReducer(
        {
          wsConnected: true,
          orderHistory: null,
        },
        {
          type: types.ORDER_HISTORY_ERROR,
        }
      )
    ).toEqual({
      wsConnected: false,
      orderHistory: null,
    });
  });
  it("вебсокет истории заказов определенный заказ", () => {
    expect(
      orderHistoryReducer(
        {
          wsConnected: true,
          orderHistory: null,
        },
        {
          type: types.ORDER_HISTORY_GET_MESSAGE,
          payload: wsGetMessage,
        }
      )
    ).toEqual({
      wsConnected: true,
      orderHistory: wsGetMessage,
    });
  });
  it("закрытие вебсокета истории заказов", () => {
    expect(
      orderHistoryReducer(
        {
          wsConnected: true,
          orderHistory: wsGetMessage,
        },
        {
          type: types.ORDER_HISTORY_CLOSE,
        }
      )
    ).toEqual({
      wsConnected: false,
      orderHistory: wsGetMessage,
    });
  });
  it("вебсокет истории заказов закрыт", () => {
    expect(
      orderHistoryReducer(
        {
          wsConnected: true,
          orderHistory: wsGetMessage,
        },
        {
          type: types.ORDER_HISTORY_CLOSED,
        }
      )
    ).toEqual({
      wsConnected: false,
      orderHistory: wsGetMessage,
    });
  });
});
