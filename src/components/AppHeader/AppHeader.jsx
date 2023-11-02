import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.nav__constructorAndRibbon}>
            <a href="#" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">Конструктор</p>
            </a>
            <a href="#" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лента Заказов
              </p>
            </a>
          </li>
          <li>
            <a href="#" className={styles.header__logo}>
              <Logo />
            </a>
          </li>
          <li>
            <a href="#" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Личный Кабинет
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
