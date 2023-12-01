import React, { FC } from "react";
import styles from "./ImageIngredient.module.css";
import { TIngredient } from "../../utils/types";

export const ImageIngredient: FC<{
  extraQuantity?: number;
  ingredient: TIngredient;
}> = ({ extraQuantity, ingredient }) => {
  return (
    <div className={styles.border}>
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.image}
      />
      {extraQuantity && extraQuantity !== 0 && (
        <div className={styles.extra}>
          <p className="text text_type_main-small">+{extraQuantity}</p>
        </div>
      )}
    </div>
  );
};
