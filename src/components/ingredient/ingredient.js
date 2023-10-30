import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";

import {
  moveIngredient,
  removeIngredient,
} from "../../services/constructorSlice";

export const Ingredient = ({ position, index, id }) => {
  const refWithin = useRef(null);
  const dispatch = useDispatch();
  const { burgerConstructor } = useSelector((store) => store);

  const handleDeleteIngredient = (event, ingredient) => {
    event.preventDefault();
    const index = burgerConstructor.ingredients.indexOf(ingredient);
    dispatch(removeIngredient(index));
  };

  const changeTargetPlace = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  const [{ handlerId }, dropWithin] = useDrop({
    accept: "ingredientConstructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!refWithin.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = refWithin.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      changeTargetPlace(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, dragWithin] = useDrag({
    type: "ingredientConstructor",
    item: () => {
      return { id, index };
    },
  });

  dragWithin(dropWithin(refWithin));

  return (
    <li
      ref={refWithin}
      data-handler-id={handlerId}
      draggable
      className={`${styles.ingredient} `}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={position?.name}
        price={position?.price}
        thumbnail={position?.image}
        handleClose={(event) => handleDeleteIngredient(event, position)}
      />
    </li>
  );
};
