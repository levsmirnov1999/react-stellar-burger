import React from "react";
import BurgerIngredientsSettings from "./BurgerIngredientsSettings/BurgerIngredientsSettings";
import BurgerIngredientsTabs from "./BurgerIngredientsTabs/BurgerIngredientsTabs";
import styles from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";

function BurgerIngredients({ ingredients, ingredient, handleIngredientClick }) {
  return (
    <section className={styles.burgerIngredients}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <BurgerIngredientsTabs />
      <BurgerIngredientsSettings
        ingredients={ingredients}
        ingredient={ingredient}
        handleIngredientClick={handleIngredientClick}
      />
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ),
};

export default BurgerIngredients;
