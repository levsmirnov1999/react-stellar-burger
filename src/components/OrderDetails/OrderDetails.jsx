import React from "react";
import styles from "./OrderDetails.module.css";
import check from "../../images/check.svg";

function OrderDetails() {
  return (
    <>
      <div className={`${styles.details} mt-20 mb-15 pl-25 pr-25`}>
        <p className={`${styles.orderNumber} text text_type_digits-large mb-8`}>
          123456
        </p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img src={check} alt="Заказ принят" />
        <p className="text text_type_main-default mt-15 mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive ">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
}

export default OrderDetails;
