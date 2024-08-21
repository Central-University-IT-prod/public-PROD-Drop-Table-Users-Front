import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { Avatar } from "@mantine/core";
import {
  IconUsers,
  IconFiles,
  IconTemplate,
  IconChevronRight,
} from "@tabler/icons-react";

import { SelectorCloseModal, SelectorOpenModal } from "@/storage";

import styles from "./Admin.module.scss";

const Admin = () => {
  const [, openModal] = useRecoilState(SelectorOpenModal);
  const [, closeModal] = useRecoilState(SelectorCloseModal);
  const navigate = useNavigate();

  const nav = (path: string) => {
    closeModal(1);
    navigate(path);
  };

  return (
    <div className={styles.Cells}>
      <div onClick={() => nav("/admin/users")} className={styles.Cell}>
        <div className={styles.CellAbout}>
          <Avatar radius="md">
            <IconUsers size={22} />
          </Avatar>

          <div>
            <h4>Участники</h4>
            <div className={styles.CellDescription}>
              Загрузка, просмотр и редактирование данных
            </div>
          </div>
        </div>

        <IconChevronRight />
      </div>

      <div onClick={() => nav("/admin/docs")} className={styles.Cell}>
        <div className={styles.CellAbout}>
          <Avatar radius="md">
            <IconFiles size={22} />
          </Avatar>

          <div>
            <h4>Шаблоны для документов</h4>
            <div className={styles.CellDescription}>
              Управление требуемыми документами
            </div>
          </div>
        </div>

        <IconChevronRight />
      </div>

      <div
        onClick={() => openModal("createTemplateForTeam")}
        className={styles.Cell}
      >
        <div className={styles.CellAbout}>
          <Avatar radius="md">
            <IconTemplate size={22} />
          </Avatar>

          <div>
            <h4>Шаблоны команд</h4>
            <div className={styles.CellDescription}>
              Редактирование условий создания команды
            </div>
          </div>
        </div>

        <IconChevronRight />
      </div>
    </div>
  );
};

export default Admin;
