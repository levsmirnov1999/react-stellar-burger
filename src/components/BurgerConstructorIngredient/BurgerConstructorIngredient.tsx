import React, { useRef } from "react";
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
import { TIngredient } from "../../utils/types";

type TBurgerConstructorIngredient = {
  ingredient: TIngredient;
  index: number;
};

const BurgerConstructorIngredient: React.FC<TBurgerConstructorIngredient> = ({
  ingredient,
  index,
}) => {
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
    hover: (draggedItem: { id: string; index: number }) => {
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
};

export default BurgerConstructorIngredient;
