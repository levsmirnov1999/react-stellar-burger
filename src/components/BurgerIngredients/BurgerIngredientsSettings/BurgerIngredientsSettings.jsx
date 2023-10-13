import React from "react";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import styles from "./BurgerIngredientsSettings.module.css";
import PropTypes from "prop-types";

function BurgerIngredientsSettings({ ingredients, handleIngredientClick }) {
  return (
    <div className={styles.scroll}>
      <h2 className="text text_type_main-medium  mt-10 mb-6">Булки</h2>
      <ul className={styles.list}>
        {ingredients
          .filter((item) => item.type === "bun")
          .map((item) => (
            <BurgerIngredientsItem
              key={item._id}
              ingredient={item}
              handleIngredientClick={handleIngredientClick}
            />
          ))}
      </ul>
      <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
      <ul className={styles.list}>
        {ingredients
          .filter((item) => item.type === "sauce")
          .map((item) => (
            <BurgerIngredientsItem
              key={item._id}
              ingredient={item}
              handleIngredientClick={handleIngredientClick}
            />
          ))}
      </ul>
      <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
      <ul className={styles.list}>
        {ingredients
          .filter((item) => item.type === "main")
          .map((item) => (
            <BurgerIngredientsItem
              key={item._id}
              ingredient={item}
              handleIngredientClick={handleIngredientClick}
            />
          ))}
      </ul>
    </div>
  );
}

BurgerIngredientsSettings.propTypes = {
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

export default BurgerIngredientsSettings;
