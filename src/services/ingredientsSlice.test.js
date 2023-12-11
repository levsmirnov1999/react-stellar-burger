import ingredientsReducer, {
  getIngredientData,
  toggleIngredientsTab,
  initialState,
} from "./ingredientsSlice";
import { fetchIngredients } from "./ingredientsQuery";
import { testIngredients } from "../utils/testConstants";

describe("ingredientsReducer", () => {
  it("должен обработать начальное состояние", () => {
    expect(ingredientsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("должен обрабатывать toggleIngredientsTab", () => {
    const previousState = initialState;
    expect(
      ingredientsReducer(previousState, toggleIngredientsTab("sauce"))
    ).toEqual({
      ...initialState,
      ingredientsCurrentTab: "sauce",
    });
  });

  it("должен обрабатывать getIngredientData", () => {
    const testIngredient = {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      type: "bun",
    };
    expect(
      ingredientsReducer(initialState, getIngredientData(testIngredient))
    ).toEqual({
      ...initialState,
      ingredientDetails: { ingredient: testIngredient },
    });
  });

  describe("fetchIngredients", () => {
    it("должен обрабатывать fetchIngredients.pending", () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        error: "",
      });
    });

    it("должен обрабатывать fetchIngredients.fulfilled", () => {
      testIngredients;
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: testIngredients,
      };
      const state = ingredientsReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        ingredients: testIngredients,
        isLoading: false,
      });
    });

    it("должен обрабатывать fetchIngredients.rejected", () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: "Test error" },
      };
      const state = ingredientsReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: "Test error",
      });
    });
  });
});
