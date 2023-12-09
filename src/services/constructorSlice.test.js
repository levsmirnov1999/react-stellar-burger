import constructorReducer, {
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveIngredient,
  saveOrderNumber,
  setOrderError,
} from "./constructorSlice";
import { createOrder } from "./createOrderQuery";

describe("constructorReducer", () => {
  const initialState = {
    bun: null,
    ingredients: [],
    totalPrice: 0,
    orderNumber: null,
    orderError: null,
    isCreatingOrder: false,
  };

  it("должен обработать начальное состояние", () => {
    expect(constructorReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("должен обрабатывать addIngredient с булкой", () => {
    const testIngredient = { type: "bun", price: 100 };
    expect(
      constructorReducer(
        initialState,
        addIngredient({ ingredient: testIngredient })
      )
    ).toEqual({
      ...initialState,
      bun: { ...testIngredient, uniqueId: expect.any(String) },
      totalPrice: 200,
    });
  });

  it("должен обрабатывать addIngredient не с булкой", () => {
    const testIngredient = { type: "main", price: 100 };
    expect(
      constructorReducer(
        initialState,
        addIngredient({ ingredient: testIngredient })
      )
    ).toEqual({
      ...initialState,
      ingredients: [{ ...testIngredient, uniqueId: expect.any(String) }],
      totalPrice: 100,
    });
  });

  it("должен обрабатывать removeIngredient", () => {
    const ingredientToAdd = { type: "main", price: 100 };
    const stateWithIngredient = constructorReducer(
      initialState,
      addIngredient({ ingredient: ingredientToAdd })
    );
    const ingredientToRemove = stateWithIngredient.ingredients[0];
    const newState = constructorReducer(
      stateWithIngredient,
      removeIngredient({ ingredient: ingredientToRemove })
    );

    expect(newState).toEqual({
      ...initialState,
      totalPrice: 0,
    });
  });

  it("должен обрабатывать resetConstructor", () => {
    const modifiedState = {
      ...initialState,
      ingredients: [{ type: "main", price: 100, uniqueId: "unique-id-1" }],
      totalPrice: 100,
    };
    expect(constructorReducer(modifiedState, resetConstructor())).toEqual(
      initialState
    );
  });

  it("должен обрабатывать moveIngredient", () => {
    const firstIngredient = { type: "main", price: 100 };
    const secondIngredient = { type: "main", price: 200 };

    let stateWithIngredients = constructorReducer(
      initialState,
      addIngredient({ ingredient: firstIngredient })
    );
    stateWithIngredients = constructorReducer(
      stateWithIngredients,
      addIngredient({ ingredient: secondIngredient })
    );

    const newState = constructorReducer(
      stateWithIngredients,
      moveIngredient({ oldIndex: 0, newIndex: 1 })
    );

    expect(
      newState.ingredients.map((ing) => ({ type: ing.type, price: ing.price }))
    ).toEqual([
      { type: secondIngredient.type, price: secondIngredient.price },
      { type: firstIngredient.type, price: firstIngredient.price },
    ]);
  });

  it("должен обрабатывать saveOrderNumber", () => {
    const orderNumber = "12345";
    expect(
      constructorReducer(initialState, saveOrderNumber(orderNumber))
    ).toEqual({
      ...initialState,
      orderNumber: orderNumber,
    });
  });

  it("должен обрабатывать setOrderError", () => {
    const errorMessage = "Error message";
    expect(
      constructorReducer(initialState, setOrderError(errorMessage))
    ).toEqual({
      ...initialState,
      orderError: errorMessage,
    });
  });

  it("должен обрабатывать createOrder.pending", () => {
    const action = { type: createOrder.pending.type };
    expect(constructorReducer(initialState, action)).toEqual({
      ...initialState,
      isCreatingOrder: true,
    });
  });

  it("должен обрабатывать createOrder.fulfilled", () => {
    const testOrderNumber = "12345";
    const action = {
      type: createOrder.fulfilled.type,
      payload: { success: true, order: { number: testOrderNumber } },
    };
    expect(constructorReducer(initialState, action)).toEqual({
      ...initialState,
      isCreatingOrder: false,
      orderNumber: testOrderNumber,
    });
  });

  it("должен обрабатывать createOrder.rejected", () => {
    const errorMessage = "Test error";
    const action = {
      type: createOrder.rejected.type,
      error: { message: errorMessage },
    };
    expect(constructorReducer(initialState, action)).toEqual({
      ...initialState,
      isCreatingOrder: false,
      orderError: errorMessage,
    });
  });
});
