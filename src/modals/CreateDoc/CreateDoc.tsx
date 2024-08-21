import { useState } from "react";
import { useForm } from "@mantine/form";
import { useRecoilState } from "recoil";

import { TextInput, Textarea, Button, Select } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";

import { toast } from "react-hot-toast";

import {
  AdminDocsInterface,
  AdminDocsComparisons,
  AtomAdminDocs,
  SelectorCloseModal,
  AtomAdminUsers,
} from "@/storage";

import styles from "./CreateDoc.module.scss";
import { checkAdminDocs } from "@/utils";

const allowFields = [
  {
    label: "Возраст",
    placeholder: "Число",
    field: "birthdayDate",
    value: "",
    component: TextInput,
    type: "number",
    comparisons: "equals",
    dataComparisons: [
      { label: "Больше", value: "more" },
      { label: "Меньше", value: "less" },
      { label: "Равно", value: "equals" },
    ],
  },
  {
    label: "Пол",
    placeholder: "Выбрать",
    field: "sex",
    value: "",
    component: Select,
    data: [
      { label: "Мужской", value: "male" },
      { label: "Женский", value: "female" },
    ],
    comparisons: "equals",
    dataComparisons: [{ label: "Равно", value: "equals" }],
  },
];

const CreateDoc = () => {
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
  });

  const [{ users }, setUser] = useRecoilState(AtomAdminUsers);

  const [, closeModal] = useRecoilState(SelectorCloseModal);
  const [state, setState] = useRecoilState(AtomAdminDocs);
  const [conditions, setConditions] = useState<typeof allowFields>([]);

  const handleEditCondition = (
    index: number,
    json: Partial<typeof allowFields>,
  ) => {
    const conditionsCur = [...conditions];
    conditionsCur[index] = { ...conditionsCur[index], ...json };
    setConditions(conditionsCur);
  };

  const createDoc = () => {
    const data: AdminDocsInterface = { ...form.values, conditions: [] };
    data.conditions = [...conditions]
      .map((el) => ({
        field: el.field,
        value: el.value,
        comparison: el.comparisons as AdminDocsComparisons,
      }))
      .filter((el) => el.value.toString().length > 0);

    const docs = [...state, data];

    setState(docs);
    closeModal(1);

    if (users.length > 0) {
      setUser((prev) => ({
        ...prev,
        users: prev.users.map((user) => [
          ...user.slice(0, 6),
          ...docs.map((doc) =>
            checkAdminDocs(doc.conditions, user as (string | number)[]),
          ),
        ]),
      }));
    }

    toast.success("Успешное создание документа!");
  };

  return (
    <form>
      <TextInput
        label={"Название"}
        placeholder={"Введите название..."}
        withAsterisk
        className={"p12"}
        {...form.getInputProps("name")}
      />

      <Textarea
        label={"Описание для участников"}
        className={"p12"}
        {...form.getInputProps("description")}
      />

      <div className={styles.ButtonsCondition}>
        <Button
          variant="light"
          leftSection={<IconPlus />}
          fullWidth
          onClick={() => setConditions([...conditions, allowFields[0]])}
          className={styles.ButtonAddCondition}
        >
          Добавить условие
        </Button>

        {conditions.length > 0 && (
          <Button
            variant="light"
            color={"red"}
            onClick={() =>
              setConditions(conditions.slice(0, conditions.length - 1))
            }
          >
            <IconTrash />
          </Button>
        )}
      </div>

      {conditions.map((el, i) => {
        return (
          <div key={i} className={styles.Conditions}>
            <Select
              value={el.field}
              onChange={(value) => {
                const index = allowFields.findIndex(
                  (field) => field.field === value,
                );
                if (index === -1) return;

                const conditionsCur = [...conditions];
                conditionsCur[i] = allowFields[index];

                setConditions(conditionsCur);
              }}
              placeholder={"Поле"}
              data={allowFields.map((el) => ({
                label: el.label,
                value: el.field,
              }))}
            />

            <Select
              value={el.comparisons}
              placeholder={"Условие"}
              onChange={(value) => {
                if (value !== null) {
                  handleEditCondition(i, {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    comparisons: value,
                  });
                }
              }}
              data={el.dataComparisons}
            />

            {
              <el.component
                placeholder={el.placeholder}
                type={el.type}
                data={el.data}
                onChange={(value) => {
                  handleEditCondition(i, {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    value:
                      typeof value === "string"
                        ? value
                        : parseInt(value?.currentTarget.value ?? ""),
                  });
                }}
              />
            }
          </div>
        );
      })}

      <Button
        color={"green"}
        fullWidth
        onClick={createDoc}
        className={styles.CreateButton}
      >
        Создать документ
      </Button>
    </form>
  );
};

export default CreateDoc;
