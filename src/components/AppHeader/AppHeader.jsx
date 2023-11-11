import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import styles from "./AppHeader.module.css";

function AppHeader() {
  const { pathname } = useLocation();
  const homePage = pathname === "/";
  const profPage = pathname === "/profile/edit-profile";
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.nav__constructorAndRibbon}>
            <Link to="/" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
              {homePage ? (
                <>
                  <BurgerIcon type="primary" />
                  <p className="text text_type_main-default">Конструктор</p>
                </>
              ) : (
                <>
                  <BurgerIcon type="secondary" />
                  <p className="text text_type_main-default text_color_inactive">
                    Конструктор
                  </p>
                </>
              )}
            </Link>
            <a href="#" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лента Заказов
              </p>
            </a>
          </li>
          <li>
            <Link to="/" className={styles.header__logo}>
              <Logo />
            </Link>
          </li>
          <li>
            <Link
              to="/profile/edit-profile"
              className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}
            >
              {profPage ? (
                <>
                  <ProfileIcon type="primary" />
                  <p className="text text_type_main-default">Личный кабинет</p>
                </>
              ) : (
                <>
                  <ProfileIcon type="secondary" />
                  <p className="text text_type_main-default text_color_inactive">
                    Личный кабинет
                  </p>
                </>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
