import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from "../BurgerConstructorIngredient/BurgerConstructorIngredient";
import { openOrderModal } from "../../services/modalSlice";
import { addIngredient } from "../../services/constructorSlice";
import styles from "./BurgerConstructor.module.css";

import { createOrder } from "../../services/createOrderQuery";
import { useNavigate } from "react-router-dom";
import React from "react";
import { TIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const BurgerConstructor: React.FC = () => {
  const bunInConstructor = useAppSelector(
    (state) => state.constructorSlice.bun
  );
  const totalPrice = useAppSelector(
    (state) => state.constructorSlice.totalPrice
  );
  const ingredientsInConstructor = useAppSelector(
    (state) => state.constructorSlice.ingredients
  );
  const user = useAppSelector((state) => state.userSlice.user);
  const isCreatingOrder = useAppSelector(
    (state) => state.constructorSlice.isCreatingOrder
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      dispatch(addIngredient(item));
    },
  });

  const handleOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const ingredientIds = ingredientsInConstructor.map(
      (ingredient: TIngredient) => ingredient._id
    );
    if (bunInConstructor) {
      ingredientIds.push(bunInConstructor._id, bunInConstructor._id);
    }

    try {
      await dispatch(createOrder(ingredientIds));
      dispatch(openOrderModal());
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <section ref={dropRef} className={`${styles.burgerConstructor} mt-25`}>
      <ul className={styles.order}>
        {bunInConstructor && (
          <li className="mr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bunInConstructor.name + " (верх)"}
              price={bunInConstructor.price}
              thumbnail={bunInConstructor.image}
            />
          </li>
        )}

        <div className={`${styles.scroll} pr-2`}>
          {ingredientsInConstructor.map(
            (ingredient: TIngredient, index: number) => (
              <BurgerConstructorIngredient
                key={ingredient.uniqueId}
                ingredient={ingredient}
                index={index}
              />
            )
          )}
        </div>

        {bunInConstructor && (
          <li className="mr-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunInConstructor.name + " (низ)"}
              price={bunInConstructor.price}
              thumbnail={bunInConstructor.image}
            />
          </li>
        )}
      </ul>

      <div className={`${styles.makingAnOrder} mt-10`}>
        <div className={`${styles.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleOrder}
          type="primary"
          size="large"
          htmlType="button"
          disabled={!bunInConstructor || isCreatingOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isCreatingOrder && <span className={styles.loader}></span>}
    </section>
  );
};
export default BurgerConstructor;
