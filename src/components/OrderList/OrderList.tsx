import { Link, useLocation } from "react-router-dom";
import styles from "./OrderList.module.css";
import { useAppSelector } from "../../hooks/hooks";
import { Order } from "../Order/Order";

export const OrderList = () => {
  const location = useLocation();
  const { orderFeed } = useAppSelector((state) => state.feedReducer);

  return (
    <ul className={styles.list}>
      {orderFeed?.orders.map((order) => {
        return (
          <Link
            key={order._id}
            to={`/feed/${order._id}`}
            state={{ background: location, orderNumber: order.number }}
            className={styles.link}
          >
            <li className={styles.item}>
              <Order order={order} />
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
