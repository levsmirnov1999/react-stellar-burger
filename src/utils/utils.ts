export const BASE_URL = `https://norma.nomoreparties.space/api`;

export const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};
