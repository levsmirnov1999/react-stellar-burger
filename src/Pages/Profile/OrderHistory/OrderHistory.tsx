import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./OrderHistory.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  orderHistoryClose,
  orderHistoryStart,
} from "../../../services/webSockets/actions/orderHistory";
import { wsURL } from "../../../utils/utils";
import { Order } from "../../../components/Order/Order";

export const OrdersHistory: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { orderHistory } = useAppSelector((state) => state.orderHistoryReducer);

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
    dispatch(orderHistoryStart(`${wsURL}?token=${tokenWithoutBearer}`));
    return () => {
      dispatch(orderHistoryClose("closed by client"));
    };
  }, []);

  return orderHistory ? (
    <ul className={styles.list}>
      {orderHistory.orders.reverse().map((order) => {
        return (
          <Link
            to={`/profile/orders/${order._id}`}
            state={{ background: location, orderNumber: order.number }}
            className={styles.link}
            key={order._id}
          >
            <li className={styles.item}>
              <Order order={order} status={true} />
            </li>
          </Link>
        );
      })}
    </ul>
  ) : (
    <></>
  );
};
