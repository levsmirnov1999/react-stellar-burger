import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from "../BurgerConstructorIngredient/BurgerConstructorIngredient";
import { openOrderModal } from "../../services/modalSlice";
import {
  addIngredient,
  saveOrderNumber,
} from "../../services/constructorSlice";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";

function BurgerConstructor() {
  const bunInConstructor = useSelector((state) => state.constructorSlice.bun);
  const totalPrice = useSelector((state) => state.constructorSlice.totalPrice);
  const ingredientsInConstructor = useSelector(
    (state) => state.constructorSlice.ingredients
  );

  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      dispatch(addIngredient(item));
    },
  });

  const createOrder = async (ingredients) => {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка");
    }

    const data = await response.json();

    return data;
  };

  const handleOrder = async () => {
    try {
      const ingredientIds = ingredientsInConstructor.map(
        (ingredient) => ingredient._id
      );
      if (bunInConstructor) {
        ingredientIds.push(bunInConstructor._id, bunInConstructor._id);
      }

      const orderData = await createOrder(ingredientIds);

      if (orderData.success) {
        dispatch(saveOrderNumber(orderData.order.number));
        dispatch(openOrderModal());
      } else {
        throw new Error(orderData.message);
      }
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
          {ingredientsInConstructor.map((ingredient, index) => (
            <BurgerConstructorIngredient
              key={ingredient.uniqueId}
              ingredient={ingredient}
              index={index}
            />
          ))}
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
          disabled={!bunInConstructor}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

ConstructorElement.propTypes = {
  isLocked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default BurgerConstructor;
