import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks";
import { useClickOutside } from "@mantine/hooks";

import Markdown from "react-markdown";
import {
  Image,
  Loader,
  Avatar,
  Title,
  Badge,
  Button,
  Tooltip,
  Popover,
} from "@mantine/core";
import { IconBrandTelegram, IconDots } from "@tabler/icons-react";

import { api } from "@/utils";
import { AtomTeams, AtomUsers, TeamInfoInterface } from "@/storage";
import { UserMajor } from "@/enums";

import styles from "./Team.module.scss";
import { toast } from "react-hot-toast";

const Team = () => {
  const [openMore, setOpen] = useState(false);
  const [info, setInfo] = useState<TeamInfoInterface | null>(null);

  const { my } = useRecoilValue(AtomUsers);
  const { choose } = useRecoilValue(AtomTeams);

  const PopoverRef = useClickOutside(() => setOpen(false));

  useEffect(() => {
    getTeam();
  }, []);

  const getTeam = useDebounce(() => {
    api(`teams/load/${choose}`, "GET").then((data) =>
      setInfo({ ...data.team, users: data.users }),
    );
  }, 100);

  const reqSend = () => {
    api(`teams/apply/${info?.id}`, "POST");
    toast.success("Заявка успешно отправлена!");
  };

  return info ? (
    <>
      <div className={styles.RightActions}>
        {(my?.team === -1 || my?.team === info.id) && (
          <Popover
            width={250}
            position="bottom"
            withArrow
            shadow="md"
            opened={openMore}
          >
            <Popover.Target ref={PopoverRef}>
              <Button
                variant="default"
                size="xs"
                onClick={() => setOpen(!openMore)}
              >
                <IconDots />
              </Button>
            </Popover.Target>

            <Popover.Dropdown>
              {my.team === -1 ? (
                <Button variant="light" fullWidth onClick={() => reqSend()}>
                  Подать заявку
                </Button>
              ) : (
                <>
                  <Button variant="light" fullWidth>
                    Сгенерировать вакансии
                  </Button>
                </>
              )}
            </Popover.Dropdown>
          </Popover>
        )}

        <Badge>{info.membersCount} / 5 чел.</Badge>
      </div>

      <Image
        src={info.bannerUrl}
        fallbackSrc={`https://placehold.co/600x400?text=${info.name}`}
        className={styles.Banner}
      />

      <Avatar
        src={info.iconUrl}
        variant="filled"
        size={"xl"}
        className={styles.Avatar}
      />

      <Title className={styles.TeamName}>{info.name}</Title>

      <div className={styles.AboutTeam}>
        <Title order={4}>Описание команды</Title>
        <Markdown className={styles.Description}>{info.description}</Markdown>

        <Title order={4} className={styles.TitleMembers}>
          Участники команды
        </Title>

        {info.users &&
          info.users.map((el) => (
            <div className={styles.User}>
              <div className={styles.MainInfoUser}>
                <Avatar />

                <div>
                  <Title order={5}>
                    {el.firstName} {el.lastName}
                  </Title>

                  <div className={styles.UserMajor}>{UserMajor[el.major]}</div>
                </div>
              </div>

              <Tooltip label="Написать в Telegram" withArrow>
                <Button
                  component={"a"}
                  href={`https://t.me/${el.tgLogin.slice(1)}`}
                  target={"_blank"}
                  variant={"light"}
                  size={"xs"}
                >
                  <IconBrandTelegram size={20} />
                </Button>
              </Tooltip>
            </div>
          ))}
      </div>
    </>
  ) : (
    <Loader className={styles.Loader} />
  );
};

export default Team;
