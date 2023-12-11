import type { Middleware } from "redux";

export type TWsActions = {
  init: string;
  success: string;
  closed: string;
  error: string;
  close: string;
  message: string;
};

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return ((store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;

      if (action.type === wsActions.init) {
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: wsActions.success, payload: "WebSocket Opened" });
        };
        socket.onerror = (event) => {
          dispatch({ type: wsActions.error, payload: "WebSocket Error" });
        };
        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsActions.message, payload: parsedData });
        };
        socket.onclose = (event) => {
          dispatch({ type: wsActions.closed, payload: "WebSocket Closed" });
        };
        if (action.type === wsActions.close) {
          socket.close(1000, action.payload);
        }
      }
      next(action);
    };
  }) as Middleware;
};
