import React from "react";
import styles from "./Register.module.css";
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/userQuery";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.userSlice.status);
  const { status, error } = useAppSelector((state) => state.userSlice);

  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [pass, setPass] = React.useState<string>("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register({ email, password: pass, name }));
      navigate("/");
    } catch (err) {
      console.error("Failed to register: ", err);
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.register}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setName(e.target.value)}
        value={name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <EmailInput
        placeholder={"E-mail"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={"email"}
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        name={"password"}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
        Зарегистрироваться
      </Button>
      <div className={styles.questions}>
        <p className="text text_type_main-default">Уже зарегистрированы?</p>
        <Link to="/login" className={styles.link}>
          <p className="text text_type_main-default mb-4">Войти</p>
        </Link>
      </div>
    </form>
  );
}
export default Register;
