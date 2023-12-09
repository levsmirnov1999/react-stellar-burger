export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly _id?: string;
  uniqueId: string;
  __v: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TOrderFeedOptions = {
  _id: string;
  ingredients: string[];
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TFeed = {
  success: boolean;
  orders: TOrderFeedOptions[];
  total: number;
  totalToday: number;
};
export type TSameOrderIngredient = TIngredient & {
  quantity: number;
};

export interface IUserUpdateData {
  name: string;
  email: string;
}
