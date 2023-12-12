import modalReducer, {
  closeAllModals,
  openIngredient,
  openOrderModal,
  initialState,
} from "./modalSlice";

describe("modalReducer", () => {
  it("должен обработать начальное состояние", () => {
    expect(modalReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен обрабатывать openIngredient", () => {
    expect(modalReducer(initialState, openIngredient())).toEqual({
      ...initialState,
      ingredientDetails: { isOpened: true },
    });
  });

  it("должен обрабатывать openOrderModal", () => {
    expect(modalReducer(initialState, openOrderModal())).toEqual({
      ...initialState,
      orderDetails: { isOpened: true },
    });
  });

  it("должен обрабатывать closeAllModals", () => {
    const modifiedState = {
      ...initialState,
      ingredientDetails: { isOpened: true },
      orderDetails: { isOpened: true },
    };

    expect(modalReducer(modifiedState, closeAllModals())).toEqual(initialState);
  });
});
