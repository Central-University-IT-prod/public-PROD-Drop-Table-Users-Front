import { useRecoilState } from "recoil";
import { useState } from "react";

import { Select, Button } from "@mantine/core";

import { AtomUsers, SelectorCloseModal } from "@/storage";

import styles from "./SortUsers.module.scss";

const SortUsers = () => {
  const [state, setState] = useRecoilState(AtomUsers);
  const [type, setType] = useState(state.sortBy);

  const [, closeModal] = useRecoilState(SelectorCloseModal);

  const setFilter = () => {
    setState((prev) => ({ ...prev, sortBy: type }));
    closeModal(1);
  };

  return (
    <>
      <div className={styles.TextInfo}>
        В данном окне вы можете отфильтровать участников по направлениям. Это
        может помочь вам найти конкретных людей для приглашения в команду
      </div>

      <Select
        value={type}
        label={"Направление"}
        data={[
          { label: "Фронтенд", value: "FRONTEND" },
          { label: "Бэкенд", value: "BACKEND" },
          { label: "Мобильная разработка", value: "MOBILE" },
        ]}
        onChange={(value) => setType(value)}
        clearable
        className={styles.Select}
      />

      <Button onClick={setFilter} fullWidth>
        Применить
      </Button>
    </>
  );
};

export default SortUsers;
