export const BASE_URL = `https://norma.nomoreparties.space/api`;

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const wsURL = "wss://norma.nomoreparties.space/orders";

export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
