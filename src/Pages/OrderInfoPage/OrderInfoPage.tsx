import React, { FC, ReactNode } from "react";
import styles from "./OrderInfoPage.module.css";

export const OrderInfoPage: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.page}>{children}</div>;
};
