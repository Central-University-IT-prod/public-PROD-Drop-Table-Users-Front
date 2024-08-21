import { useRecoilState } from "recoil";

import Markdown from "react-markdown";
import { Title, Avatar, Badge } from "@mantine/core";

import UserProps from "./User.interface.ts";

import { UserMajor, UserMajorColor } from "@/enums";
import { SelectorOpenModal } from "@/storage";

import styles from "@/pages/Home/Home.module.scss";

const User = ({ info }: UserProps) => {
  const isLogin = localStorage.getItem("access_token");
  const [, openModal] = useRecoilState(SelectorOpenModal);

  return (
    <div
      onClick={() => openModal(isLogin ? "" : "auth")}
      className={styles.Item}
    >
      <div className={styles.InfoAbout}>
        <Avatar radius="xl" size={"lg"} />

        <div>
          <Title order={3}>
            {info.firstName} {info.lastName}
          </Title>

          {info.description.length === 0 ? (
            <div className={styles.PlaceholderText}>
              Участник не заполнил описание о себе...
            </div>
          ) : (
            <Markdown className={styles.DescriptionMd}>
              {info.description}
            </Markdown>
          )}
        </div>

        <Badge color={UserMajorColor[info.major]}>
          {UserMajor[info.major]}
        </Badge>
      </div>
    </div>
  );
};

export default User;
