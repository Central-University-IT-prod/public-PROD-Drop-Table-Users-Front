import { useRecoilState } from "recoil";
import { useState } from "react";

import { Button, MultiSelect, Checkbox } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { toast } from "react-hot-toast";
import { AtomTemplates, SelectorCloseModal } from "@/storage";

import styles from "./CreateTemplateTeams.module.scss";

const CreateTemplateTeams = () => {
  const [state, setState] = useRecoilState(AtomTemplates);
  const [slots, setSlots] = useState<{ items: string[]; req: false }[]>(state);

  const [, closeModal] = useRecoilState(SelectorCloseModal);

  const handleSlot = (index: number, json: object) => {
    const slotsCur = [...slots];
    slotsCur[index] = { ...slotsCur[index], ...json };
    setSlots(slotsCur);
  };

  const createTemplates = () => {
    toast.success(
      `Шаблоны команд ${state.length > 0 ? "отредактированы" : "созданы"}!`,
    );

    setState(slots);
    closeModal(1);
  };

  return (
    <>
      <Button
        onClick={() => setSlots([...slots, { items: [], req: false }])}
        className={styles.ButtonCreate}
      >
        Создать слот
      </Button>

      <Button
        variant="light"
        color="red"
        disabled={slots.length === 0}
        onClick={() => setSlots(slots.slice(0, slots.length - 1))}
      >
        <IconTrash />
      </Button>

      {slots.length > 0 && (
        <div className={styles.Titles}>
          <div>Слоты</div>
          <div>Обязательность</div>
        </div>
      )}

      {slots.map((el, i) => (
        <div className={styles.SelectWithCheckbox}>
          <MultiSelect
            placeholder={"Выбор направлений"}
            value={el.items}
            onChange={(values) => handleSlot(i, { items: values })}
            data={[
              { label: "Фронтенд", value: "FRONTEND" },
              { label: "Бэкенд", value: "BACKEND" },
              { label: "Мобильная разработка", value: "MOBILE" },
            ]}
          />

          <Checkbox
            checked={el.req}
            onChange={(e) => handleSlot(i, { req: e.currentTarget.checked })}
          />
        </div>
      ))}

      <Button
        color={"green"}
        fullWidth
        disabled={slots.length === 0}
        onClick={() => createTemplates()}
        className={styles.ButtonCreateTemplate}
      >
        {state.length > 0 ? "Редактировать" : "Создать"} шаблон
      </Button>
    </>
  );
};

export default CreateTemplateTeams;
