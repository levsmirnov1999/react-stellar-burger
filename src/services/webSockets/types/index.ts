export type TError = {
  success?: boolean;
  message?: string;
  status?: number;
};
export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOrders = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export type TwsActions = {
  wsConnection: string;
  wsOffline: string;
  wsOpen: string;
  wsError: string;
  wsMessage: string;
  wsClose: string;
};
