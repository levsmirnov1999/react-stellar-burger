import React from "react";
import styles from "./IngredientDetails.module.css";

function IngredientDetails({ ingredientData }) {
  const { image_large, name, calories, carbohydrates, fat, proteins } =
    ingredientData;

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large pl-10`}>
        Детали ингредиента
      </h2>
      <div className={`${styles.details} pl-25 pr-25`}>
        <img className="ml-5 mr-5" src={image_large} alt={name} />
        <p
          className={`${styles.titleIngredient} text text_type_main-medium mt-4`}
        >
          {name}
        </p>
        <ul className={`${styles.energyValues} mt-8`}>
          <li className={styles.energyValue}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {calories}
            </p>
          </li>
          <li className={styles.energyValue}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {proteins}
            </p>
          </li>
          <li className={styles.energyValue}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {fat}
            </p>
          </li>
          <li className={styles.energyValue}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default IngredientDetails;
