import React from "react";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

import styles from "./IngredientsPage.module.css";

function IngredientsPage() {
  return (
    <div className={styles.ingredient}>
      <IngredientDetails />
    </div>
  );
}

export default IngredientsPage;
