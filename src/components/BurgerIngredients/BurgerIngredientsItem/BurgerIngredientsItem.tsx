import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsItem.module.css";
import { getIngredientData } from "../../../services/ingredientsSlice";
import { openIngredient } from "../../../services/modalSlice";
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { TIngredient } from "../../../utils/types";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

const BurgerIngredientsItem: React.FC<{ ingredient: TIngredient }> = ({
  ingredient,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const store = useAppSelector((store) => store);
  const ingredients = store.constructorSlice.ingredients;
  const bun = useAppSelector((state) => state.constructorSlice.bun);

  const countIngredient = (ingredientId: string | undefined) => {
    const countFromIngredients = ingredients.filter(
      (ing: TIngredient) => ing._id === ingredientId
    ).length;

    let bunCount = 0;
    if (bun && bun._id === ingredientId) {
      bunCount = 2;
    }

    return countFromIngredients + bunCount;
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getIngredientsData = (ingredient: TIngredient) => {
    dispatch(getIngredientData(ingredient));
    dispatch(openIngredient());
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  return (
    <li
      className={styles.item}
      ref={dragRef}
      tabIndex={0}
      onClick={() => getIngredientsData(ingredient)}
    >
      <Counter count={countIngredient(ingredient._id)} size="default" />

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
};

export default BurgerIngredientsItem;
