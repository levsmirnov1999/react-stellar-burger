import React from "react";
import styles from "./Login.module.css";
import {
  PasswordInput,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/userQuery";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.userSlice);

  const [email, setEmail] = React.useState<string>("");
  const [pass, setPass] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password: pass }));
      navigate("/");
    } catch (err) {
      console.error("Ошибка при входе: ", err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <EmailInput
        placeholder={"E-mail"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={"email"}
        extraClass="mb-6"
        isIcon={false}
      />
      <PasswordInput
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        name={"password"}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
        Войти
      </Button>
      <div className={styles.questions}>
        <p className="text text_type_main-default">Вы - новый пользователь?</p>
        <Link to="/register" className={styles.link}>
          <p className="text text_type_main-default mb-4">Зарегистрироваться</p>
        </Link>
      </div>
      <div className={styles.questions}>
        <p className="text text_type_main-default">Забыли пароль?</p>
        <Link to="/forgot-password" className={styles.link}>
          <p className="text text_type_main-default text_color_active">
            Восстановить пароль
          </p>
        </Link>
      </div>
    </form>
  );
}

export default Login;
