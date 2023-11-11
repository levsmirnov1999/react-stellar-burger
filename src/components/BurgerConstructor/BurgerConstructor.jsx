import { useSelector, useDispatch } from "react-redux";
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
import PropTypes from "prop-types";
import { createOrder } from "../../services/createOrderQuery";
import { useNavigate } from "react-router-dom";

function BurgerConstructor() {
  const bunInConstructor = useSelector((state) => state.constructorSlice.bun);
  const totalPrice = useSelector((state) => state.constructorSlice.totalPrice);
  const ingredientsInConstructor = useSelector(
    (state) => state.constructorSlice.ingredients
  );
  const user = useSelector((state) => state.userSlice.user);
  const isCreatingOrder = useSelector(
    (state) => state.constructorSlice.isCreatingOrder
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      dispatch(addIngredient(item));
    },
  });

  const handleOrder = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const ingredientIds = ingredientsInConstructor.map(
      (ingredient) => ingredient._id
    );
    if (bunInConstructor) {
      ingredientIds.push(bunInConstructor._id, bunInConstructor._id);
    }
    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then((orderData) => {
        if (orderData.success) {
          dispatch(openOrderModal());
        } else {
          throw new Error(orderData.message);
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
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
          disabled={!bunInConstructor || isCreatingOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isCreatingOrder && <span className={styles.loader}></span>}
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
