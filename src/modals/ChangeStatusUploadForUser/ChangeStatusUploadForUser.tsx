import { useRecoilState } from "recoil";

import { Button } from "@mantine/core";

import { AtomAdminUsers, SelectorCloseModal } from "@/storage";
import { toast } from "react-hot-toast";

import styles from "./ChangeStatusUploadForUser.module.scss";

const ChangeStatusUploadForUser = () => {
  const [state, setState] = useRecoilState(AtomAdminUsers);
  const [, closeModal] = useRecoilState(SelectorCloseModal);

  const updateState = () => {
    const users = [
      ...state.users
        .filter((el) => !el[6 + state.sortByDoc])
        .filter((_el, i) => state.selectRows.includes(i)),
    ];

    const usersCur = [...state.users];

    for (const user of users) {
      const index = state.users.findIndex((el) => el[3] === user[3]);

      const us = [...usersCur[index]];
      us[6 + state.sortByDoc] = true;
      usersCur[index] = us;
    }

    setState((prev) => ({ ...prev, users: usersCur, selectRows: [] }));
    toast.success("Пользователи загрузили документы!");
    closeModal(1);
  };

  return (
    <>
      <div className={styles.text}>
        Выбранным вами пользователям будем отправлено уведомление через
        Telegram, где они смогут загрузить документ <br /> <br />
        Вы можете сменить им статус загрузки самостоятельно
      </div>

      <Button onClick={() => updateState()} fullWidth>
        Сменить статус загрузки
      </Button>
    </>
  );
};

export default ChangeStatusUploadForUser;
