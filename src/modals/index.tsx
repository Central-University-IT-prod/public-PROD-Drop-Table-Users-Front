import ModalAuth from "./Auth/Auth.tsx";
import ModalCreateTeam from "./CreateTeam/CreateTeam.tsx";
import ModalTeam from "./Team/Team.tsx";

import ModalAdmin from "./Admin/Admin.tsx";
import ModalCreateDoc from "./CreateDoc/CreateDoc.tsx";
import ModalChangeStatusUploadForUser from "./ChangeStatusUploadForUser/ChangeStatusUploadForUser.tsx";
import ModalCreateTemplateTeams from "./CreateTemplateTeams/CreateTemplateTeams.tsx";

import ModalSortTeams from "./SortTeams/SortTeams.tsx";
import ModalSortUsers from "./SortUsers/SortUsers.tsx";

import styles from "./index.module.scss";

export default [
  {
    id: "auth",
    title: "Авторизация",
    fullScreen: { mobile: true, desktop: false },
    component: <ModalAuth />,
  },
  {
    id: "createTeam",
    title: "Создание команды",
    fullScreen: { mobile: true, desktop: false },
    component: <ModalCreateTeam />,
  },
  {
    id: "admin",
    title: "Админ-панель",
    fullScreen: { mobile: true, desktop: false },
    component: <ModalAdmin />,
  },
  {
    id: "createDoc",
    title: "Создание шаблона документа",
    fullScreen: { mobile: true, desktop: false },
    component: <ModalCreateDoc />,
  },
  {
    id: "infoTeam",
    title: "Просмотр команды",
    fullScreen: { mobile: true, desktop: false },
    component: <ModalTeam />,
    className: styles.ModalWithoutPadding,
  },
  {
    id: "changeStatusUploadForUser",
    title: "Смена статуса загрузки",
    fullScreen: { mobile: true, desktop: false },
    component: <ModalChangeStatusUploadForUser />,
  },
  {
    id: "sortTeams",
    title: "Сортировка команд",
    fullScreen: { mobile: true, desktop: false },
    component: <ModalSortTeams />,
  },
  {
    id: "sortUsers",
    title: "Сортировка участников",
    fullScreen: { mobile: true, desktop: false },
    component: <ModalSortUsers />,
  },
  {
    id: "createTemplateForTeam",
    title: "Шаблоны команд",
    fullScreen: { mobile: true, desktop: false },
    component: <ModalCreateTemplateTeams />,
  },
];
