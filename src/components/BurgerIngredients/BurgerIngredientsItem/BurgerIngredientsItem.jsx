import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsItem.module.css";

function BurgerIngredientsItem({ ingredient, handleIngredientClick }) {
  return (
    <a
      href="#"
      className={styles.item}
      onClick={() => handleIngredientClick(ingredient)}
    >
      <Counter count={0} size="default" />
      <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.price} mt-2 mb-2`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.subtitle} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </a>
  );
}

export default BurgerIngredientsItem;
