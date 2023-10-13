import React from "react";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";

function BurgerConstructor({ handleOnButtonClick }) {
  return (
    <section className={`${styles.burgerConstructor} mt-25`}>
      <ul className={styles.order}>
        <li className="mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={1255}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </li>
        <div className={`${styles.scroll} pr-2`}>
          <li className={`${styles.ingredient} mb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус фирменный Space Sauce"
              price="80"
              thumbnail={"https://code.s3.yandex.net/react/code/sauce-04.png"}
            />
          </li>
          <li className={`${styles.ingredient} mb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Хрустящие минеральные кольца"
              price="300"
              thumbnail={
                "https://code.s3.yandex.net/react/code/mineral_rings.png"
              }
            />
          </li>
          <li className={`${styles.ingredient} mb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Биокотлета из марсианской Магнолии"
              price="424"
              thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
            />
          </li>
          <li className={`${styles.ingredient} mb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Сыр с астероидной плесенью"
              price="4142"
              thumbnail={"https://code.s3.yandex.net/react/code/cheese.png"}
            />
          </li>
          <li className={`${styles.ingredient} mb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус фирменный Space Sauce"
              price="80"
              thumbnail={"https://code.s3.yandex.net/react/code/sauce-04.png"}
            />
          </li>
          <li className={`${styles.ingredient} mb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Биокотлета из марсианской Магнолии"
              price="424"
              thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
            />
          </li>
          <li className={`${styles.ingredient} mb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Сыр с астероидной плесенью"
              price="4142"
              thumbnail={"https://code.s3.yandex.net/react/code/cheese.png"}
            />
          </li>
          <li className={`${styles.ingredient} mb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Хрустящие минеральные кольца"
              price="300"
              thumbnail={
                "https://code.s3.yandex.net/react/code/mineral_rings.png"
              }
            />
          </li>
          <li className={`${styles.ingredient} mb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус фирменный Space Sauce"
              price="80"
              thumbnail={"https://code.s3.yandex.net/react/code/sauce-04.png"}
            />
          </li>
        </div>
        <li className="mr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={1255}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </li>
      </ul>
      <div className={`${styles.makingAnOrder} mt-10`}>
        <div className={`${styles.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">12482</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleOnButtonClick}
          type="primary"
          size="large"
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
