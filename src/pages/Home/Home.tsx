import { useState, useEffect, memo } from "react";
import { useRecoilState } from "recoil";
import { useDebounce } from "@/hooks";

import InfiniteScroll from "react-infinite-scroll-component";
import { ActionIcon, Loader } from "@mantine/core";
import { Team, User } from "@/pages/Home/__components";
import { IconAdjustmentsAlt } from "@tabler/icons-react";

import { api } from "@/utils";
import { AtomTeams, AtomUsers, SelectorOpenModal } from "@/storage";
// import { MockTeamsInHome } from "@/mock";

import styles from "./Home.module.scss";

const Home = memo(() => {
  const [active, setActive] = useState(0);

  const [teams, setTeams] = useRecoilState(AtomTeams);
  const [user, setUsers] = useRecoilState(AtomUsers);

  const [, openModal] = useRecoilState(SelectorOpenModal);

  const state = active ? user.users : teams.teams;

  useEffect(() => {
    if (state.items) return;

    // setTimeout(() => {
    //   setTeams((prev) => ({
    //     ...prev,
    //     teams: { hasMore: false, offset: 20, items: MockTeamsInHome },
    //   }));
    // }, 500);

    getItems();
  }, []);

  const getItems = useDebounce(
    async (offset: number = 0, activeCur?: number) => {
      const setState = activeCur || active ? setUsers : setTeams;
      const key = activeCur || active ? "users" : "teams";

      const items = await api(
        `${activeCur || active ? "users/withoutTeam" : "teams/load"}?limit=1000&offset=${offset}`,
        "GET",
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setState((prev) => ({
        ...prev,
        [key]: {
          hasMore: items.length === 1000,
          offset: prev[key].offset + 1000,
          items: prev[key]?.items ? [...prev[key].items, ...items] : items,
        },
      }));
    },
    100,
  );

  const handlerSetActive = (id: number) => {
    setActive(id);

    const items = id ? user.users : teams.teams;
    if (!items.items) getItems(0, id);
  };

  return (
    <>
      <div role={"tablist"} className={styles.Tabs}>
        <div aria-checked={active === 0} onClick={() => handlerSetActive(0)}>
          Команды
        </div>
        /
        <div
          aria-checked={active === 1}
          onClick={() => handlerSetActive(1)}
          className={styles.IconSort}
        >
          Участники без команды
        </div>
        <div className={styles.SortInfo}>
          <ActionIcon
            size="lg"
            variant={"transparent"}
            onClick={() => openModal(active ? "sortUsers" : "sortTeams")}
            className={styles.IconSort}
          >
            <IconAdjustmentsAlt size={32} />
          </ActionIcon>

          {(active ? !!user.sortBy : false) && (
            <div className={styles.FiltersSet} />
          )}
        </div>
      </div>

      {state.items && state.items.length === 0 && (
        <div className={styles.Placeholder}>
          Кажется,{" "}
          {active
            ? "пользователи без команд закончились..."
            : "команд ещё нет. Самое время создать свою!"}
        </div>
      )}

      <InfiniteScroll
        next={() => getItems(state.offset)}
        hasMore={state.hasMore}
        dataLength={state.items?.length ?? 0}
        loader={<Loader />}
        className={styles.Items}
      >
        {state?.items &&
          state.items
            .filter((el) =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              active ? (user.sortBy ? el.major === user.sortBy : true) : true,
            )
            .map((el) => {
              const Component = active ? User : Team;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              return <Component key={el.id} info={el} />;
            })}
      </InfiniteScroll>
    </>
  );
});

export default Home;
