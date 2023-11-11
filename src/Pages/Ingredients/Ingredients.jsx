import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

import styles from "./Ingredients.module.css";

function IngredientsPage() {
  return (
    <div className={styles.ingredient}>
      <IngredientDetails />
    </div>
  );
}

export default IngredientsPage;
