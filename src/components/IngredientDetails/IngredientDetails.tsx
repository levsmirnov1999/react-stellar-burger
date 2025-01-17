import styles from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../utils/types";
import React from "react";
import { useAppSelector } from "../../hooks/hooks";

function IngredientDetails({
  ingredientData,
}: {
  ingredientData?: TIngredient | null;
}) {
  const { id } = useParams<{ id: string }>();
  const ingredients = useAppSelector(
    (state) => state.ingredientsSlice.ingredients
  );

  const ingredient =
    ingredientData || ingredients.find((item: TIngredient) => item._id === id);

  if (!ingredient) {
    return <p>Ингредиент не найден</p>;
  }

  const { image_large, name, calories, carbohydrates, fat, proteins } =
    ingredient;

  return (
    <div className={`pl-10 pr-10 ${styles.ingredient}`}>
      <div className={`mt-10 ${styles.header}`}>
        <h2 className={`text text_type_main-large ${styles.title}`}>
          Детали ингредиента
        </h2>
      </div>
      <img
        className={`mt-15 mb-15 ${styles.image}`}
        src={image_large}
        alt="Ингредиент"
      />
      <p className={`text text_type_main-medium mt-4 mb-8 ${styles.name}`}>
        {name}
      </p>
      <ul className={`text text_type_main-default mb-15 ${styles.listItem}`}>
        <li className={`text text_type_main-default ${styles.item}`}>
          <p className={`text text_type_main-default ${styles.itemText}`}>
            Калории,ккал
          </p>
          <p className={`${styles.itemValue}`}>{calories}</p>
        </li>
        <li className={`text text_type_main-default ${styles.item}`}>
          <p className={`text text_type_main-default ${styles.itemText}`}>
            Белки, г
          </p>
          <p className={`${styles.itemValue}`}>{proteins}</p>
        </li>
        <li className={`text text_type_main-default ${styles.item}`}>
          <p className={`text text_type_main-default ${styles.itemText}`}>
            Жиры, г
          </p>
          <p className={`${styles.itemValue}`}>{fat}</p>
        </li>
        <li className={`text text_type_main-default ${styles.item}`}>
          <p className={`text text_type_main-default ${styles.itemText}`}>
            Углеводы, г
          </p>
          <p className={`${styles.itemValue}`}>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
