import { useRecoilState /*useRecoilValue*/ } from "recoil";
import { useEffect, memo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "@mantine/hooks";

import { AppShell, Button, Avatar, Loader, Popover } from "@mantine/core";
import {
  IconChevronUp,
  IconCrown,
  IconPlus,
  IconLogout,
  IconUsers,
} from "@tabler/icons-react";

import { api } from "@/utils";
import { /*AtomTeams,*/ AtomUsers, SelectorOpenModal } from "@/storage";
import { UserGroups } from "@/enums";

import styles from "./Header.module.scss";

const Header = memo(() => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isOpened, setOpen] = useState(false);

  const [, openModal] = useRecoilState(SelectorOpenModal);
  const [state, setState] = useRecoilState(AtomUsers);

  // const {} = useRecoilValue(AtomTeams);

  const PopoverRef = useClickOutside(() => setOpen(false));
  const InfoUserRef = useRef<HTMLDivElement>(null);

  const user = state.my;

  useEffect(() => {
    if (user?.registerAt || !localStorage.getItem("access_token")) {
      return setLoading(false);
    }

    getUser();
  }, []);

  const getUser = () => {
    api("users/my", "GET")
      .then((data) => {
        if ("errorText" in data) return localStorage.removeItem("access_token");
        setState((prev) => ({ ...prev, my: data }));
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
    window.location.reload();
  };

  const handlerOpenModal = (id: string) => {
    openModal(id);
    setOpen(false);
  };

  return (
    <AppShell.Header className={styles.header}>
      {loading ? (
        <Loader size={"sm"} />
      ) : user?.username ? (
        <Popover
          width={(InfoUserRef.current?.clientWidth ?? 0) + 20}
          shadow="md"
          opened={isOpened}
        >
          <Popover.Target ref={PopoverRef}>
            <div
              ref={InfoUserRef}
              onClick={() => setOpen(!isOpened)}
              className={styles.User}
            >
              <Avatar alt="Ваш аватар" />

              <div className={styles.InfoAboutUser}>
                <h3 className={styles.UserName}>
                  {user.firstName} {user.lastName}
                </h3>

                <div className={styles.UserRole}>{UserGroups[user.group]}</div>
              </div>

              <IconChevronUp
                aria-checked={isOpened}
                className={styles.Chevron}
              />
            </div>
          </Popover.Target>

          <Popover.Dropdown>
            {user.group === "ADMIN" && (
              <Button
                variant={"subtle"}
                leftSection={<IconCrown />}
                fullWidth
                onClick={() => handlerOpenModal("admin")}
              >
                Админ-панель
              </Button>
            )}

            {user.group === "MEMBER" &&
              (user.team === -1 ? (
                <Button
                  variant="subtle"
                  leftSection={<IconPlus />}
                  fullWidth
                  onClick={() => handlerOpenModal("createTeam")}
                >
                  Создать команду
                </Button>
              ) : (
                <Button
                  color="yellow"
                  variant="subtle"
                  leftSection={<IconUsers />}
                  fullWidth
                  onClick={() => handlerOpenModal("infoTeam")}
                >
                  Открыть команду
                </Button>
              ))}

            <Button
              color="red"
              variant="subtle"
              leftSection={<IconLogout />}
              fullWidth
              onClick={logout}
            >
              Выйти
            </Button>
          </Popover.Dropdown>
        </Popover>
      ) : (
        <Button variant="outline" onClick={() => openModal("auth")}>
          Войти
        </Button>
      )}
    </AppShell.Header>
  );
});

export default Header;
