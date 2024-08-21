import { useRecoilState } from "recoil";

import { MultiSelect, Button } from "@mantine/core";

import { TagsList } from "@/enums";
import { SelectorCloseModal } from "@/storage";

import styles from "./SortTeams.module.scss";

const SortTeams = () => {
  const [, closeModal] = useRecoilState(SelectorCloseModal);

  const updateTags = () => {
    closeModal(1);
  };

  return (
    <>
      <div className={styles.TextInfo}>
        В данном окне вы можете отфильтровать команды по тегам. Это может помочь
        вам найти конкретные команды, которые, возможно, ищут вас!
      </div>

      <MultiSelect
        data={TagsList.map((el) => ({ ...el, value: el.value.toString() }))}
        className={styles.Select}
      />

      <Button fullWidth onClick={updateTags}>
        Применить
      </Button>
    </>
  );
};

export default SortTeams;
