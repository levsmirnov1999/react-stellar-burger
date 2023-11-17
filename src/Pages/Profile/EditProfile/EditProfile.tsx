import React, { useState, useEffect, useRef } from "react";
import styles from "./EditProfile.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUserData } from "../../../services/userQuery";

function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.userSlice.user);
  const [name, setName] = useState<{ userName: string; disabled: boolean }>({
    userName: user ? user.name : "",
    disabled: true,
  });
  const [email, setEmail] = useState<{ mail: string; disabled: boolean }>({
    mail: user ? user.email : "",
    disabled: true,
  });
  const [pass, setPass] = useState<string | undefined>();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const initialUserData = useRef(user);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName({ userName: user.name, disabled: true });
      setEmail({ mail: user.email, disabled: true });
      initialUserData.current = user;
    }
  }, [user]);

  const onNameClick = () => {
    setTimeout(() => nameRef.current?.focus(), 0);
    setName({ ...name, disabled: false });
  };
  const onEmailClick = () => {
    setTimeout(() => emailRef.current?.focus(), 0);
    setEmail({ ...email, disabled: false });
  };
  const onSaveClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userUpdateData = { name: name.userName, email: email.mail };
      await dispatch(updateUserData(userUpdateData));
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };

  const onCancelClick = () => {
    setName({ userName: initialUserData.current.name, disabled: true });
    setEmail({ mail: initialUserData.current.email, disabled: true });
  };
  return (
    <form onSubmit={onSaveClick} className={styles.editProfile}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onIconClick={onNameClick}
        onChange={(e) => setName({ ...name, userName: e.target.value })}
        value={name.userName}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
        ref={nameRef}
        icon={"EditIcon"}
        onBlur={() => setName({ ...name, disabled: true })}
        disabled={name.disabled ? true : false}
      />
      <Input
        placeholder={"Логин"}
        onIconClick={onEmailClick}
        onChange={(e) => setEmail({ ...email, mail: e.target.value })}
        value={email.mail}
        name={"email"}
        size={"default"}
        extraClass="mb-6"
        icon={"EditIcon"}
        ref={emailRef}
        onBlur={() => setEmail({ ...email, disabled: true })}
        disabled={email.disabled ? true : false}
      />
      <PasswordInput
        onChange={(e) => setPass(e.target.value)}
        value="123"
        name={"password"}
      />
      <div className={styles.buttons}>
        <Button
          onClick={onCancelClick}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          Отмена
        </Button>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default EditProfile;
