import React, { FC } from "react";
import styles from "./Feed.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { wsURL } from "../../utils/utils";
import { feedClose, feedStart } from "../../services/webSockets/actions/feed";
import { OrderList } from "../../components/OrderList/OrderList";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";

const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orderFeed } = useAppSelector((state) => state.feedReducer);

  React.useEffect(() => {
    dispatch(feedStart(`${wsURL}/all`));
    return () => {
      dispatch(feedClose("closed by client"));
    };
  }, []);
  return (
    <section className={styles.feed}>
      {orderFeed ? (
        <>
          <p className="text text_type_main-large mb-5 mt-5">Лента заказов</p>
          <div className={styles.main}>
            <OrderList />
            <OrderSummary />
          </div>
        </>
      ) : (
        <div className={styles.preloader}>
          <span className={styles.loader}></span>
        </div>
      )}
    </section>
  );
};

export default Feed;
