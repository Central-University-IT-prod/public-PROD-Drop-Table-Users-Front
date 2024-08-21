import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useRecoilState } from "recoil";

import { Button, TextInput, Select } from "@mantine/core";
import {
  IconAt,
  IconLetterA,
  IconLetterB,
  IconCake,
  IconBriefcase,
  IconBrandTelegram,
  IconKey,
} from "@tabler/icons-react";

import { api } from "@/utils";
// import { MockUserInfo } from "@/mock";
import { toast } from "react-hot-toast";
import {
  UserInfo,
  SelectorCloseModal,
  AtomUsers,
  SelectorOpenModal,
} from "@/storage";

import styles from "./Auth.module.scss";

type UserProps = { birthdayDate: string; password: string } & Omit<
  UserInfo,
  "birthdayDate" | "registerAt" | "group" | "id" | "team" | "description"
>;

const Auth = () => {
  const [isLoading, setLoading] = useState(false);
  const [isAuth, setAuth] = useState(true);

  const [, setState] = useRecoilState(AtomUsers);
  const [, openModal] = useRecoilState(SelectorOpenModal);
  const [, closeModal] = useRecoilState(SelectorCloseModal);
  const form = useForm<UserProps>({
    initialValues: {
      firstName: "",
      lastName: "",
      birthdayDate: "",
      major: "BACKEND",
      username: "",
      password: "",
      tgLogin: "",
    },
  });

  useEffect(() => {
    if (isAuth) {
      form.clearFieldError("password");
    } else {
      validatePassword(form.values.password);
    }
  }, [isAuth]);

  const validatePassword = (password: string) => {
    if (isAuth || password.length === 0) return;
    let error;

    if (!/^(?=.*[a-z])(?=.*[A-Z]).*$/.test(password))
      error =
        "Должны присутствовать латинские символы в нижнем и верхнем регистре";
    if (!/.*\d.*/.test(password))
      error = "Должна присутсовать минимум одна цифра";
    if (!/^[^\s\W]+$/.test(password))
      error = "В пароле не должны быть пробелы и прочие спец. символы";

    if (!error) {
      return form.clearFieldError("password");
    }

    form.setFieldError("password", error);
  };

  const auth = async (values: UserProps) => {
    setLoading(true);

    let body: Partial<UserInfo> & { password: string } = {
      username: values.username,
      password: values.password,
    };

    if (!isAuth) {
      body = {
        ...body,
        ...values,
        tgLogin:
          values.tgLogin.slice(0, 1) !== "@"
            ? `@${values.tgLogin}`
            : values.tgLogin,
        birthdayDate: new Date(values.birthdayDate).getTime(),
      };
    }

    const response = await api(
      `users/${isAuth ? "login" : "register"}`,
      "POST",
      body,
    );

    if ("errorText" in response) {
      setLoading(false);
      return toast.error(response.errorText);
    }

    localStorage.setItem("access_token", response.token);

    const userInfo = await api("users/my", "GET");
    setState((prev) => ({ ...prev, my: userInfo }));

    closeModal(1);
    toast.success(`Успешная ${isAuth ? "авторизация" : "регистрация"}!`);

    setTimeout(() => {
      if (userInfo.group === "ADMIN") {
        openModal("admin");
      }
    }, 100);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        auth(form.values);
      }}
    >
      {!isAuth && (
        <>
          <div className={styles.Names}>
            <TextInput
              name={"firstName"}
              label={"Имя"}
              maxLength={32}
              leftSection={<IconLetterA size={16} />}
              placeholder={"Имя"}
              className={"p12"}
              {...form.getInputProps("firstName")}
            />

            <TextInput
              name={"lastName"}
              label={"Фамилия"}
              maxLength={32}
              leftSection={<IconLetterB size={16} />}
              placeholder={"Фамилия"}
              className={"p12"}
              {...form.getInputProps("lastName")}
            />
          </div>

          <TextInput
            type={"date"}
            label={"Дата рождения"}
            leftSection={<IconCake size={16} />}
            className={"p12"}
            {...form.getInputProps("birthdayDate")}
          />

          <Select
            leftSection={<IconBriefcase size={16} />}
            label={"Направление"}
            data={[
              { label: "Бэкенд", value: "BACKEND" },
              { label: "Фронтенд", value: "FRONTEND" },
              { label: "Мобильная разработка", value: "MOBILE" },
            ]}
            className={"p12"}
            {...form.getInputProps("major")}
          />

          <TextInput
            label={"Telegram аккаунт"}
            maxLength={33}
            leftSection={<IconBrandTelegram size={16} />}
            placeholder={"В формате @..."}
            autoComplete={"off"}
            className={"p12"}
            {...form.getInputProps("tgLogin")}
          />
        </>
      )}

      <TextInput
        type={"email"}
        label={"Почта"}
        leftSection={<IconAt size={16} />}
        placeholder={"Введите вашу почту..."}
        className={"p12"}
        {...form.getInputProps("username")}
      />

      <TextInput
        type={"password"}
        label={"Пароль"}
        minLength={8}
        maxLength={256}
        leftSection={<IconKey size={16} />}
        placeholder={"Введите ваш пароль..."}
        error={form.errors.password}
        onChange={(e) => {
          form.setFieldValue("password", e.currentTarget.value);
          validatePassword(e.currentTarget.value);
        }}
        className={"p12"}
      />

      <Button type={"submit"} loading={isLoading} fullWidth>
        {isAuth ? "Войти" : "Зарегистрироваться"}
      </Button>

      <div className={styles.Registration}>
        {isAuth ? "Ещё нет аккаунта?" : "Уже есть аккаунт?"}{" "}
        <span onClick={() => setAuth(!isAuth)}>
          {isAuth ? "Зарегистрироваться" : "Войти"}
        </span>
      </div>
    </form>
  );
};

export default Auth;
