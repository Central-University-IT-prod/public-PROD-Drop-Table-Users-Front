import { useRecoilState, useRecoilValue } from "recoil";

import {
  Title,
  ActionIcon,
  Table,
  Badge,
  Button,
  Popover,
} from "@mantine/core";
import { IconCirclePlus, IconX, IconDots } from "@tabler/icons-react";

import { DocsFields, DocsComparisonBySymbol, DocsSex } from "@/enums";
import { AtomAdminDocs, AtomMain, SelectorOpenModal } from "@/storage";

import styles from "./Docs.module.scss";

const Docs = () => {
  const { isDesktop } = useRecoilValue(AtomMain);

  const [state, setState] = useRecoilState(AtomAdminDocs);
  const [, openModal] = useRecoilState(SelectorOpenModal);

  const deleteDoc = (index: number) => {
    const docs = [...state];
    docs.splice(index, 1);

    setState(docs);
  };

  return (
    <>
      <Title order={isDesktop ? 1 : 2} className={styles.Title}>
        Шаблоны для документов{" "}
        <ActionIcon
          size="lg"
          variant={"transparent"}
          onClick={() => openModal("createDoc")}
        >
          <IconCirclePlus size={32} />
        </ActionIcon>
      </Title>

      {state.length === 0 ? (
        <div className={styles.TextPlaceholder}>
          Документов нет, создайте первый!
        </div>
      ) : (
        <Table
          striped
          withTableBorder
          withColumnBorders
          className={styles.Table}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Название</Table.Th>
              <Table.Th>Описание</Table.Th>
              <Table.Th>Условия</Table.Th>
              <Table.Th>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {state.map((el, i) => (
              <Table.Tr key={i}>
                <Table.Th>{el.name}</Table.Th>

                <Table.Th
                  className={
                    el.description?.length === 0
                      ? styles.IconNone
                      : styles.FileDescription
                  }
                >
                  {el.description?.length === 0 ? (
                    <IconX />
                  ) : (
                    <span>{el.description}</span>
                  )}
                </Table.Th>

                <Table.Th
                  className={el.conditions.length === 0 ? styles.IconNone : ""}
                >
                  {el.conditions.length === 0 ? (
                    <IconX />
                  ) : (
                    el.conditions.map((el, i) => (
                      <Badge key={i}>
                        {DocsFields[el.field]}{" "}
                        {DocsComparisonBySymbol[el.comparison]}{" "}
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-expect-error*/}
                        {el.field === "sex" ? DocsSex[el.value] : el.value}
                      </Badge>
                    ))
                  )}
                </Table.Th>

                <Table.Th className={styles.TableActionButton}>
                  <Popover
                    width={200}
                    position="bottom"
                    withArrow
                    shadow="md"
                    clickOutsideEvents={["mouseup", "touchend"]}
                  >
                    <Popover.Target>
                      <Button variant="light" color="gray">
                        <IconDots />
                      </Button>
                    </Popover.Target>

                    <Popover.Dropdown>
                      <Button
                        variant="light"
                        color={"red"}
                        fullWidth
                        onClick={() => deleteDoc(i)}
                      >
                        Удалить
                      </Button>
                    </Popover.Dropdown>
                  </Popover>
                </Table.Th>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </>
  );
};

export default Docs;
