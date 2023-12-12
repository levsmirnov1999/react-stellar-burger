import { feedReducer } from "./feed";
import * as types from "../constants";

export const wsGetMessage = {
  success: true,
  total: 46814,
  totalToday: 235,
  orders: [
    {
      _id: "65700e1b7fd657001ba073d3",
      ingredients: [
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093d",
      ],
      status: "done",
      name: "Spicy флюоресцентный space бургер",
      createdAt: "2023-12-06T06:00:59.430Z",
      updatedAt: "2023-12-06T06:00:59.693Z",
      number: 28376,
    },
    {
      _id: "65700c907fd657001ba073ca",
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093c",
      ],
      status: "done",
      name: "Spicy краторный бургер",
      createdAt: "2023-12-06T05:54:24.956Z",
      updatedAt: "2023-12-06T05:54:25.218Z",
      number: 28373,
    },
  ],
};

describe("лента заказов вебсокет", () => {
  it("should return the initial state", () => {
    expect(feedReducer(undefined, {})).toEqual({
      wsConnected: false,
      orderFeed: null,
    });
  });
  it("подключен вебсокет ленты заказов", () => {
    expect(
      feedReducer(
        {
          wsConnected: false,
          orderFeed: null,
        },
        {
          type: types.FEED_SUCCESS,
        }
      )
    ).toEqual({
      wsConnected: true,
      orderFeed: null,
    });
  });
  it("ошибка вебсокета ленты заказов", () => {
    expect(
      feedReducer(
        {
          wsConnected: true,
          orderFeed: null,
        },
        {
          type: types.FEED_ERROR,
        }
      )
    ).toEqual({
      wsConnected: false,
      orderFeed: null,
    });
  });
  it("вебсокет ленты заказов отдельный заказ", () => {
    expect(
      feedReducer(
        {
          wsConnected: true,
          orderFeed: null,
        },
        {
          type: types.FEED_GET_MESSAGE,
          payload: wsGetMessage,
        }
      )
    ).toEqual({
      wsConnected: true,
      orderFeed: wsGetMessage,
    });
  });
  it("закрытие вебсокета ленты зказов", () => {
    expect(
      feedReducer(
        {
          wsConnected: true,
          orderFeed: wsGetMessage,
        },
        {
          type: types.FEED_CLOSE,
        }
      )
    ).toEqual({
      wsConnected: false,
      orderFeed: wsGetMessage,
    });
  });
  it("вебсокет ленты заказов закрыт", () => {
    expect(
      feedReducer(
        {
          wsConnected: true,
          orderFeed: wsGetMessage,
        },
        {
          type: types.FEED_CLOSED,
        }
      )
    ).toEqual({
      wsConnected: false,
      orderFeed: wsGetMessage,
    });
  });
});
