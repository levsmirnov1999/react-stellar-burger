import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  moveIngredient,
  removeIngredient,
} from "../../services/constructorSlice";
import styles from "./BurgerConstructorIngredients.module.css";
import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../utils/ingredientsPropTypes";

function BurgerConstructorIngredient({ ingredient, index }) {
  const handleDeleteIngredient = () => {
    dispatch(removeIngredient({ ingredient }));
  };
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [, dragRef] = useDrag({
    type: "constructorIngredient",
    item: { id: ingredient._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropTarget] = useDrop({
    accept: "constructorIngredient",
    hover: (draggedItem) => {
      if (draggedItem.id !== ingredient._id) {
        dispatch(
          moveIngredient({
            oldIndex: draggedItem.index,
            newIndex: index,
          })
        );
        draggedItem.index = index;
      }
    },
  });

  dragRef(dropTarget(ref));

  return (
    <li ref={ref} className={`${styles.ingredients} mb-4`}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleDeleteIngredient}
      />
    </li>
  );
}

BurgerConstructorIngredient.propTypes = {
  ingredient: PropTypes.shape(ingredientsPropTypes),
  index: PropTypes.number.isRequired,
};

export default BurgerConstructorIngredient;
