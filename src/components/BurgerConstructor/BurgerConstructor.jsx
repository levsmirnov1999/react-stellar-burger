import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { BASE_URL } from "../../utils/utils";
import { Ingredient } from "../ingredient/ingredient";

import {
  saveOrderNumber,
  statusSuccess,
} from "../../services/constructorSlice";
import { openOrderModal } from "../../services/modalSlice";

function BurgerConstructor({ onDropHandler }) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const { ingredients } = store.constructorSlice;
  const { burgerConstructor } = store;

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      onDropHandler(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const hoverDrop = isHover
    ? styles.burgerConstructorHover
    : styles.burgerConstructor;

  const placeOrder = () => {
    return async function (dispatch) {
      return fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          ingredients: [
            burgerConstructor?.bun._id,
            ...burgerConstructor.ingredients?.map((item) => item._id),
            burgerConstructor?.bun._id,
          ],
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch(saveOrderNumber(data));
        })
        .then(() => {
          dispatch(openOrderModal());
        })
        .catch((error) => {
          dispatch(statusSuccess(error));
          console.warn(error);
        });
    };
  };

  const total = useMemo(() => {
    return (
      burgerConstructor?.bun?.price * 2 +
      burgerConstructor?.ingredients?.reduce((accum, item) => {
        return (accum += item?.price);
      }, 0)
    );
  }, [burgerConstructor]);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    dispatch(placeOrder(ingredients));
  };

  return (
    <form
      ref={dropTarget}
      name="order"
      action="#"
      onSubmit={handlePlaceOrder}
      className={`mt-25 ml-4 ${hoverDrop} `}
    >
      {burgerConstructor?.bun && (
        <div className={`mb-4 pr-2 ${styles.burgerConstructor__item} `}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${burgerConstructor?.bun?.name} (верх)`}
            price={burgerConstructor?.bun?.price}
            thumbnail={burgerConstructor?.bun?.image}
          />
        </div>
      )}
      <ul className={`${styles.burgerConstructor__listitem} `}>
        {burgerConstructor?.ingredients?.map((position, index) => (
          <Ingredient
            key={index}
            id={position._id}
            position={position}
            index={index}
          />
        ))}
      </ul>
      {burgerConstructor?.bun && (
        <div className={`mt-4 pr-2 ${styles.burgerConstructor__item} `}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${burgerConstructor?.bun?.name} (низ)`}
            price={burgerConstructor?.bun?.price}
            thumbnail={burgerConstructor?.bun?.image}
          />
        </div>
      )}
      <div className={`mt-10 pb-10 ${styles.burgerConstructor__checkout} `}>
        {burgerConstructor?.bun && burgerConstructor?.ingredients && (
          <div className={`${styles.burgerConstructor__total} `}>
            <p
              className={`mr-2 text text_type_main - large ${styles.burgerConstructor__ordersum} `}
            >
              {total}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        )}
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          disabled={!burgerConstructor?.bun}
        >
          Оформить заказ
        </Button>
      </div>
    </form>
  );
}

export default BurgerConstructor;
