import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import styles from "./ProtectedRoute.module.css";

interface IProtectedRoute {
  children: React.ReactNode;
  redirectTo?: string;
  restricted?: boolean;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({
  restricted,
  children,
}) => {
  const isLoggedIn = useAppSelector((state) => state.userSlice.user);
  const isAuthChecked = useAppSelector(
    (state) => state.userSlice.isAuthChecked
  );
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (!isAuthChecked) {
    return (
      <div className={styles.preloader}>
        <span className={styles.loader}></span>
      </div>
    );
  }

  if (restricted && isLoggedIn) {
    return <Navigate to={from.pathname} replace />;
  }

  if (!restricted && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <> {children} </>;
};
