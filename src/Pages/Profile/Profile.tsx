import React from "react";
import styles from "./Profile.module.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/userQuery";
import { useAppDispatch } from "../../hooks/hooks";

function Profile() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const editPage = pathname === "/profile/edit-profile";
  const orderHistoryPage = pathname === "/profile/orders";
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.profile}>
      <div className={styles.links}>
        <Link
          to="/profile/edit-profile"
          className={editPage ? styles.link_active : styles.link_inactive}
        >
          <p className="text text_type_main-medium">Профиль</p>
        </Link>
        <Link
          to="/profile/orders"
          className={
            orderHistoryPage ? styles.link_active : styles.link_inactive
          }
        >
          <p className="text text_type_main-medium">История заказов</p>
        </Link>
        <button onClick={handleLogout} className={styles.exit}>
          <p className="text text_type_main-medium">Выход</p>
        </button>
        {editPage && (
          <p className="text text_type_main-default mt-20 text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        )}
        {orderHistoryPage && (
          <p className="text text_type_main-default mt-20 text_color_inactive">
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
