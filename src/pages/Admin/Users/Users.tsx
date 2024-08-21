import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  ActionIcon,
  Title,
  Popover,
  Button,
  Table,
  TableData,
  Select,
  Checkbox,
  Badge,
} from "@mantine/core";
import {
  IconDots,
  IconUpload,
  IconPlus,
  IconCheck,
  IconX,
  IconSend,
} from "@tabler/icons-react";

import { MockUsersForAdmin } from "@/mock";
import {
  AtomAdminUsers,
  AtomMain,
  AtomAdminDocs,
  SelectorOpenModal,
} from "@/storage";

import { formatDate, checkAdminDocs } from "@/utils";

import styles from "./Users.module.scss";

const Users = () => {
  const [fakeLoader, setLoader] = useState(false);

  const docs = useRecoilValue(AtomAdminDocs);
  const { isDesktop } = useRecoilValue(AtomMain);

  const [{ users, selectRows, sortByDoc }, setState] =
    useRecoilState(AtomAdminUsers);
  const [, openModal] = useRecoilState(SelectorOpenModal);

  const tableData: TableData = {
    head: [
      "Имя",
      "Фамилия",
      "Пол",
      "Почта",
      "Дата рождения",
      "Команда",
      ...docs.map((el) => el.name),
    ],
    body: users.map((user) => user.map((el) => checkTypeField(el))),
  };

  const sortUsersByDoc = users.filter((el) => !el[6 + sortByDoc]);

  const tableSortUsers: TableData = {
    head: ["", "Имя", "Фамилия", "Почта", "Отправка уведомления"],
    body: sortUsersByDoc.map((user, i) => [
      <Checkbox
        aria-label="Выбор строки"
        className={styles.CheckboxInTable}
        checked={selectRows.includes(i)}
        onChange={(event) =>
          setState((prev) => ({
            ...prev,
            selectRows: event.currentTarget.checked
              ? [...selectRows, i]
              : selectRows.filter((position) => position !== i),
          }))
        }
      />,
      user[0],
      user[1],
      user[3],
      <Button
        variant="light"
        size="xs"
        onClick={() => {
          setState((prev) => ({ ...prev, selectRows: [i] }));
          openModal("changeStatusUploadForUser");
        }}
        className={styles.SendNotificationInTable}
      >
        <IconSend size={20} />
      </Button>,
    ]),
  };

  const uploadUsers = () => {
    if (users.length > 0) {
      return setState((prev) => ({ ...prev, users: [] }));
    }

    setLoader(true);

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        users: MockUsersForAdmin.map((el) => [
          ...el,
          ...docs.map((doc) => checkAdminDocs(doc.conditions, el)),
        ]),
      }));
      setLoader(false);
    }, 2000);
  };

  function checkTypeField(field: string | number | boolean) {
    switch (typeof field) {
      case "string":
        return field;
      case "number":
        return formatDate(new Date(field));
      case "boolean":
        return (
          <div className={field ? styles.CheckIcon : styles.ErrorIcon}>
            {field ? <IconCheck size={20} /> : <IconX size={20} />}
          </div>
        );
    }
  }

  return (
    <>
      <Title order={isDesktop ? 1 : 2} className={styles.Title}>
        Участники
        <Popover
          width={250}
          position="bottom"
          withArrow
          shadow="md"
          clickOutsideEvents={["mouseup", "touchend"]}
        >
          <Popover.Target>
            <ActionIcon size="lg" variant={"transparent"}>
              <IconDots size={32} />
            </ActionIcon>
          </Popover.Target>

          <Popover.Dropdown>
            <Button
              variant="light"
              leftSection={<IconUpload />}
              fullWidth
              loading={fakeLoader}
              onClick={uploadUsers}
              className={styles.ButtonInDropdown}
            >
              Загрузить CSV
            </Button>

            <Button variant="light" leftSection={<IconPlus />} fullWidth>
              Добавить участника
            </Button>
          </Popover.Dropdown>
        </Popover>
      </Title>

      {users.length === 0 ? (
        <div className={styles.TextPlaceholder}>Пока нет пользователей...</div>
      ) : (
        <Table data={tableData} striped withTableBorder withColumnBorders />
      )}

      {users.length > 0 && docs.length > 0 && (
        <>
          <div className={styles.TitleDocs}>
            <Title order={3}>Список пользователей, которые не загрузили </Title>

            <Select
              value={sortByDoc.toString()}
              onChange={(value) =>
                setState((prev) => ({ ...prev, sortByDoc: Number(value) }))
              }
              data={docs.map((el, i) => ({
                label: el.name,
                value: i.toString(),
              }))}
            />
          </div>

          {sortUsersByDoc.length > 0 ? (
            <>
              <Table
                data={tableSortUsers}
                striped
                withTableBorder
                withColumnBorders
                className={styles.TableDocs}
              />

              <Button
                disabled={selectRows.length === 0}
                onClick={() => openModal("changeStatusUploadForUser")}
                className={styles.SendNotification}
              >
                Отправить уведомление{" "}
                <Badge color={"gray"}>{selectRows.length}</Badge> пользователям
              </Button>
            </>
          ) : (
            <div className={styles.TextPlaceholder}>
              Все документы загружены!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Users;
