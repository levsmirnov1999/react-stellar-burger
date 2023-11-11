import React from "react";
import styles from "./Register.module.css";
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/userQuery";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.userSlice.status);
  const { status, error } = useSelector((state) => state.userSlice);

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [pass, setPass] = React.useState("");

  const handleRegister = () => {
    dispatch(register({ email, password: pass, name }));
  };

  let errorContent = null;
  if (status === "failed") {
    errorContent = <p className="error">{error}</p>;
  }

  React.useEffect(() => {
    if (authStatus === "succeeded") {
      navigate("/");
    }
  }, [authStatus, navigate]);

  return (
    <div className={styles.register}>
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
      <Button
        onClick={handleRegister}
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mb-20"
      >
        Зарегистрироваться
      </Button>
      {errorContent}
      <div className={styles.questions}>
        <p className="text text_type_main-default">Уже зарегистрированы?</p>
        <Link to="/login" className={styles.link}>
          <p className="text text_type_main-default mb-4">Войти</p>
        </Link>
      </div>
    </div>
  );
}
export default Register;
