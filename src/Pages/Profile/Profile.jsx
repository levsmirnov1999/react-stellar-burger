import React from "react";
import styles from "./Profile.module.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/userQuery";

function Profile() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const editPage = pathname === "/profile/edit-profile";
  const orderHistoryPage = pathname === "/profile/orders";
  const dispatch = useDispatch();

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
        <p className="text text_type_main-default mt-20 text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
