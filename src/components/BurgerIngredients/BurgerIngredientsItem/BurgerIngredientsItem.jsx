import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientData } from "../../../services/ingredientsSlice";
import { openIngredient } from "../../../services/modalSlice";
import { useDrag } from "react-dnd";
import { useMemo } from "react";

function BurgerIngredientsItem({ ingredient }) {
  const dispatch = useDispatch();

  const store = useSelector((store) => store);
  const ingredients = store.constructorSlice.ingredients;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  const quantity = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient._id === ingredient._id)
      .length;
  }, [ingredients]);

  const getIngredientsData = (ingredient) => {
    dispatch(getIngredientData(ingredient));
    dispatch(openIngredient());
  };
  return (
    <li
      className={styles.item}
      ref={dragRef}
      tabIndex="0"
      onClick={() => getIngredientsData(ingredient)}
    >
      {quantity !== 0 && <Counter count={quantity} size="default" />}
      <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.price} mt-2 mb-2`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.subtitle} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </li>
  );
}

export default BurgerIngredientsItem;
