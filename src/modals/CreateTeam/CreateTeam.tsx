import { useRecoilState } from "recoil";
import { useState, useRef } from "react";
import { useForm } from "@mantine/form";

import Markdown from "react-markdown";
import { TextInput, Input, Textarea, Button } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import { api } from "@/utils";
import { toast } from "react-hot-toast";
import { AtomTeams, SelectorCloseModal } from "@/storage";

import styles from "./CreateTeam.module.scss";

const CreateTeam = () => {
  const [, setState] = useRecoilState(AtomTeams);
  const [previewMd, setPreview] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [, closeModal] = useRecoilState(SelectorCloseModal);

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (value) => (value.length === 0 ? "Введите название" : null),
      description: (value) => (value.length === 0 ? "Введите описание" : null),
    },
  });

  const DescriptionRef = useRef<HTMLTextAreaElement>(null);

  const createTeam = (values: typeof form.values) => {
    setLoading(false);

    api("teams/create", "POST", values).then((data) => {
      setState((prev) => ({ ...prev, my: { ...values, ...data } }));
      closeModal(1);

      toast.success("Успешное создание команды!");
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => createTeam(values))}>
      <TextInput
        label={"Название"}
        placeholder={"Введите название"}
        minLength={2}
        maxLength={32}
        className={"p12"}
        {...form.getInputProps("name")}
      />

      <Input.Wrapper
        label={"Описание"}
        description={"Поддерживается Markdown"}
        className={styles.Description}
      >
        {previewMd ? (
          <div
            style={{ minHeight: DescriptionRef.current?.clientHeight }}
            className={styles.PreviewMarkdown}
          >
            <div className={styles.Markdown}>
              <Markdown>{form.values.description}</Markdown>
            </div>

            <IconEyeOff
              onClick={() => setPreview(false)}
              className={styles.IconOffPreview}
            />
          </div>
        ) : (
          <Textarea
            ref={DescriptionRef}
            autosize
            rightSection={
              <IconEye
                aria-disabled={form.values.description.length === 0}
                onClick={() => setPreview(form.values.description.length > 0)}
              />
            }
            minRows={3}
            maxRows={15}
            className={styles.Textarea}
            {...form.getInputProps("description")}
          />
        )}
      </Input.Wrapper>

      <Button type={"submit"} color={"green"} loading={isLoading} fullWidth>
        Создать
      </Button>
    </form>
  );
};

export default CreateTeam;
