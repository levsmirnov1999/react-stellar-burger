import React from "react";
import styles from "./IngredientDetails.module.css";

function IngredientDetails({ ingredient }) {
  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large pl-10`}>
        Детали ингредиента
      </h2>
      <div className={`${styles.details} pl-25 pr-25`}>
        <img
          className="ml-5 mr-5"
          src={ingredient.image_large}
          alt={ingredient.name}
        />
        <p
          className={`${styles.titleIngredient} text text_type_main-medium mt-4`}
        >
          {ingredient.name}
        </p>
        <ul className={`${styles.energyValues} mt-8`}>
          <li className={styles.energyValue}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </p>
          </li>
          <li className={styles.energyValue}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </p>
          </li>
          <li className={styles.energyValue}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </p>
          </li>
          <li className={styles.energyValue}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default IngredientDetails;
