import React, { FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./OrderInfo.module.css";
import { ImageIngredient } from "../ImageIngredient/ImageIngreduent";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { feedClose, feedStart } from "../../services/webSockets/actions/feed";
import { TIngredient, TOrderFeedOptions } from "../../utils/types";
import uuid from "react-uuid";
import {
  orderHistoryClose,
  orderHistoryStart,
} from "../../services/webSockets/actions/orderHistory";
import { wsURL } from "../../utils/utils";

export const OrderInfo: FC = () => {
  const { ingredients } = useAppSelector((state) => state.ingredientsSlice);
  const { orderFeed } = useAppSelector((state) => state.feedReducer);
  const { orderHistory } = useAppSelector((state) => state.orderHistoryReducer);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { feedId, orderId } = useParams();
  const navigate = useNavigate();
  let totalPrice: number = 0;
  let data: TOrderFeedOptions = null!;
  let orderIngredients: TIngredient[] = [];
  let orderDate: Date | null = null;
  let dataReduce: { [key: string]: number } = {};

  const getAccessToken = () => {
    return {
      accessToken: localStorage.getItem("accessToken"),
    };
  };
  const { accessToken } = getAccessToken();
  const tokenWithoutBearer = accessToken
    ? accessToken.replace(/^Bearer\s/, "")
    : null;

  React.useEffect(() => {
    if (!orderFeed && feedId) {
      dispatch(feedStart(`${wsURL}/all`));
      return () => {
        dispatch(feedClose("closed by client"));
      };
    }
    if (!orderHistory && orderId) {
      dispatch(orderHistoryStart(`${wsURL}?token=${tokenWithoutBearer}`));
      return () => {
        dispatch(orderHistoryClose("closed by client"));
      };
    }
  }, []);

  if (orderFeed && orderFeed.orders.length) {
    orderFeed.orders.forEach((order, index) => {
      if (order._id === feedId || order._id === orderId) {
        data = order;
        orderDate = new Date(data.createdAt);
        dataReduce = data.ingredients.reduce(
          (acc: { [key: string]: number }, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
          },
          {}
        );
      }
      if (index + 1 === orderFeed.orders.length && data === null) {
        console.error("Order not found");
        return;
      }
    });
  }

  if (orderHistory && orderHistory.orders.length) {
    orderHistory.orders.forEach((order, index) => {
      if (order._id === feedId || order._id === orderId) {
        data = order;
        orderDate = new Date(data.createdAt);
        dataReduce = data.ingredients.reduce(
          (acc: { [key: string]: number }, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
          },
          {}
        );
      }
      if (index + 1 === orderHistory.orders.length && data === null) {
        console.error("Order not found");
        return;
      }
    });
  }
  if (dataReduce && ingredients && ingredients.length) {
    for (let key in dataReduce) {
      const ingredientCount = dataReduce[key];
      const ingredient = ingredients.find((element) => element._id === key);

      if (ingredient) {
        if (ingredient.type === "bun") {
          totalPrice += ingredient.price * ingredientCount;
        } else {
          totalPrice += ingredient.price * ingredientCount;
        }
        for (let i = 0; i < ingredientCount; i++) {
          orderIngredients.push(ingredient);
        }
      }
    }
  }
  const uniqueIngredients = Array.from(
    new Set(orderIngredients.map((ingredient) => ingredient._id))
  );

  const ingredientCounts = uniqueIngredients
    .map((ingredientId) => {
      const ingredientsWithId = orderIngredients.filter(
        (el) => el._id === ingredientId
      );

      if (ingredientsWithId.length > 0) {
        const ingredient = ingredientsWithId[0];

        const count = ingredientsWithId.length;
        const price =
          ingredient.type === "bun" ? ingredient.price * 2 : ingredient.price;

        return {
          ingredient,
          count,
          price,
        };
      }

      return null;
    })
    .filter(Boolean);
  return data !== null ? (
    <div className={styles.info}>
      <div className={styles.number}>
        <p className="text text_type_digits-default mt-6">#{data.number}</p>
      </div>

      <div className={styles.description}>
        <p className="text text_type_main-medium mt-10">{data.name}</p>
        {data.status === "created" && (
          <p className="text text_type_main-default mt-2">Создан</p>
        )}
        {data.status === "pending" && (
          <p className="text text_type_main-default mt-2">Готовится</p>
        )}
        {data.status === "done" && (
          <div className={styles.done}>
            <p className="text text_type_main-default mt-2">Выполнен</p>
          </div>
        )}
        <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      </div>
      <ul className={styles.ingredients}>
        {ingredientCounts
          .filter(
            (
              item
            ): item is {
              ingredient: TIngredient;
              count: number;
              price: number;
            } => !!item
          )
          .map(({ ingredient, count, price }) => (
            <li key={uuid()} className={styles.ingredient}>
              <div className={styles.picture}>
                <ImageIngredient ingredient={ingredient} />
                <p className="text text_type_main-default ml-4">
                  {ingredient.name}
                </p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">
                  {count} x {price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
      </ul>
      <div className={styles.footer}>
        {orderDate && (
          <p className="text text_type_main-default text_color_inactive mt-10 mb-10">
            <FormattedDate date={orderDate} />
          </p>
        )}
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : (
    <p className="text text_type_main-large mt-10 mb-10">Загрузка...</p>
  );
};
