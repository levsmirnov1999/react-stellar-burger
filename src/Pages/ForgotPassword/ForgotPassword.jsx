import React from "react";
import styles from "./ForgotPassword.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initiatePasswordReset } from "../../services/userQuery";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { passwordResetStatus, passwordResetError } = useSelector(
    (state) => state.userSlice
  );

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await dispatch(initiatePasswordReset(email)).unwrap();
      localStorage.setItem("resetPasswordAllowed", "true");
      navigate("/reset-password");
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
    }
  };

  return (
    <form onSubmit={handlePasswordReset} className={styles.forgotPassword}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <EmailInput
        placeholder={"Укажите e-mail"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={"email"}
        isIcon={false}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
        Восстановить
      </Button>
      <div className={styles.questions}>
        <p className="text text_type_main-default">Вспомнили пароль?</p>
        <Link to="/login" className={styles.link}>
          <p className="text text_type_main-default mb-4">Войти</p>
        </Link>
      </div>
    </form>
  );
}

export default ForgotPassword;
