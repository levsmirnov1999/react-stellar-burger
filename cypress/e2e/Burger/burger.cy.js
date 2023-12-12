import { BASE_URL } from "../../../src/utils/utils";
const testUrl = "http://localhost:3000/";
const BurgerConstructorOrder = "[class^=BurgerConstructor_order]";

describe("app works correctly with routes", () => {
  beforeEach("открытие страницы", () => {
    cy.visit(testUrl);
    cy.viewport(1920, 1080);
  });
  it("should check modal ingredient details", () => {
    cy.intercept(`${BASE_URL}/ingredients`).as("getIngredients");
    cy.get("p").contains("Краторная булка").click();
    cy.contains("Детали ингредиента").should("be.visible");
    cy.get("[class^=Modal_closeButton_]").click();
    cy.contains("Детали ингридиента").should("not.exist");
  });
  it("should drag ingredients, login, make order again, check preloader and popup with order ", () => {
    cy.intercept(`${BASE_URL}/ingredients`).as("getIngredients");
    const dataTransfer = new DataTransfer();
    cy.get("[class*=item]")
      .contains("Краторная булка N-200i")
      .trigger("dragstart", { dataTransfer });
    cy.get(BurgerConstructorOrder).trigger("drop", {
      dataTransfer,
    });
    cy.get("[class*=item]")
      .contains("Соус фирменный Space Sauce")
      .trigger("dragstart", { dataTransfer });
    cy.get(BurgerConstructorOrder).trigger("drop", {
      dataTransfer,
    });
    cy.get("[class*=item]")
      .contains("Филе Люминесцентного тетраодонтимформа")
      .trigger("dragstart", { dataTransfer });
    cy.get(BurgerConstructorOrder).trigger("drop", {
      dataTransfer,
    });
    cy.get("[class*=item]")
      .contains("Мини-салат Экзо-Плантаго")
      .trigger("dragstart", { dataTransfer });
    cy.get(BurgerConstructorOrder).trigger("drop", {
      dataTransfer,
    });
    cy.get("button").contains("Оформить заказ").click();
    cy.get("[type=email]").type("levsmirnov199919991999@yandex.ru");
    cy.get("[type=password]").type("Nehope1999");
    cy.get("button").contains("Войти").click();
    cy.get("button").contains("Оформить заказ").click();
    cy.intercept(`${BASE_URL}/orders`).as("getOrder");
    cy.wait("@getOrder");
    cy.contains("идентификатор заказа").should("be.visible");
    cy.get("[class^=Modal_close]").click();
    cy.contains("идентификатор заказа").should("not.exist");
  });
});
