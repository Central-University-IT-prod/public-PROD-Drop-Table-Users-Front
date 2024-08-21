import { useRecoilState } from "recoil";

import { Avatar, Badge, Image, Title } from "@mantine/core";
import Markdown from "react-markdown";

import { SelectorOpenModal, AtomTeams } from "@/storage";

import TeamProps from "./Team.interface.ts";

import styles from "@/pages/Home/Home.module.scss";

const Team = ({ info }: TeamProps) => {
  const isLogin = localStorage.getItem("access_token");

  const [, setState] = useRecoilState(AtomTeams);
  const [, openModal] = useRecoilState(SelectorOpenModal);

  const openTeam = () => {
    if (!isLogin) return openModal("auth");

    setState((prev) => ({ ...prev, choose: info.id }));
    openModal("infoTeam");
  };

  return (
    <div onClick={() => openTeam()} className={styles.Item}>
      <Image
        src={info.bannerUrl}
        fallbackSrc={`https://placehold.co/600x400?text=${info.name}`}
        height={160}
        alt="Баннер команды"
      />

      <div className={styles.InfoAbout}>
        <Avatar radius="xl" size={"lg"} src={info.iconUrl} />

        <div>
          <Title order={2}>{info.name}</Title>
          <Markdown className={styles.DescriptionMd}>
            {info.description}
          </Markdown>
        </div>

        <Badge color="indigo">{info.membersCount} / 5</Badge>
      </div>
    </div>
  );
};

export default Team;
