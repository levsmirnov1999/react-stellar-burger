import React from "react";
import styles from "./ResetPassword.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "../../services/userQuery";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

function ResetPassword() {
  const [password, setPassword] = React.useState<string>("");
  const [token, setToken] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { passwordResetStatus, passwordResetError } = useAppSelector(
    (state) => state.userSlice
  );

  React.useEffect(() => {
    return () => localStorage.removeItem("resetPasswordAllowed");
  }, []);

  const resetAllowed = localStorage.getItem("resetPasswordAllowed");

  if (!resetAllowed) {
    return <Navigate to="/forgot-password" replace />;
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(confirmPasswordReset({ password, token }));
      localStorage.removeItem("resetPasswordAllowed");
      navigate("/login");
    } catch (error) {
      console.error("Ошибка при смене пароля:", error);
    }
  };

  return (
    <form onSubmit={handlePasswordChange} className={styles.resetPassword}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={"password"}
        extraClass="mb-6"
        placeholder={"Введите новый пароль"}
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={(e) => setToken(e.target.value)}
        value={token}
        name={"code"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
        Сохранить
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

export default ResetPassword;
