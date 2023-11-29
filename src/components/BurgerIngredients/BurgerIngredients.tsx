import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "./BurgerIngredientsItem/BurgerIngredientsItem";
import { toggleIngredientsTab } from "../../services/ingredientsSlice";
import { useInView } from "react-intersection-observer";
import { TIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

function BurgerIngredients() {
  const { ingredients, ingredientsCurrentTab } = useAppSelector(
    (state) => state.ingredientsSlice
  );
  const dispatch = useAppDispatch();

  const handleTabClick = (tab: string) => {
    dispatch(toggleIngredientsTab(tab));
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inViewBuns) {
      dispatch(toggleIngredientsTab("bun"));
    } else if (inViewSauces) {
      dispatch(toggleIngredientsTab("sauce"));
    } else if (inViewFilling) {
      dispatch(toggleIngredientsTab("main"));
    }
  }, [
    ingredientsCurrentTab,
    inViewBuns,
    inViewFilling,
    inViewSauces,
    dispatch,
  ]);

  return (
    <section className={styles.burgerIngredients}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={styles.ingredientsTab}>
        <Tab
          value="bun"
          active={ingredientsCurrentTab === "bun"}
          onClick={() => {
            handleTabClick("bun");
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={ingredientsCurrentTab === "sauce"}
          onClick={() => {
            handleTabClick("sauce");
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={ingredientsCurrentTab === "main"}
          onClick={() => {
            handleTabClick("main");
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.scroll}>
        <h2
          className="text text_type_main-medium  mt-10 mb-6"
          ref={bunsRef}
          id="bun"
        >
          Булки
        </h2>
        <ul className={styles.list}>
          {ingredients
            .filter((item: TIngredient) => item.type === "bun")
            .map((item: TIngredient) => (
              <BurgerIngredientsItem key={item._id} ingredient={item} />
            ))}
        </ul>
        <h2
          className="text text_type_main-medium mt-10 mb-6"
          ref={saucesRef}
          id="sauce"
        >
          Соусы
        </h2>
        <ul className={styles.list}>
          {ingredients
            .filter((item: TIngredient) => item.type === "sauce")
            .map((item: TIngredient) => (
              <BurgerIngredientsItem key={item._id} ingredient={item} />
            ))}
        </ul>
        <h2
          className="text text_type_main-medium mt-10 mb-6"
          ref={mainsRef}
          id="main"
        >
          Начинки
        </h2>
        <ul className={styles.list}>
          {ingredients
            .filter((item: TIngredient) => item.type === "main")
            .map((item: TIngredient) => (
              <BurgerIngredientsItem key={item._id} ingredient={item} />
            ))}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;
