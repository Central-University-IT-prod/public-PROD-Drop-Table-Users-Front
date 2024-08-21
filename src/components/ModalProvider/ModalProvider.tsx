import { useRecoilState, useRecoilValue } from "recoil";

import { Modal } from "@mantine/core";

import Modals from "@/modals";
import { AtomMain, SelectorOpenModal } from "@/storage";

import ModalProviderProps from "./ModalProvider.interface.ts";

const ModalProvider = ({ children }: ModalProviderProps) => {
  const { isDesktop } = useRecoilValue(AtomMain);
  const [activeModal, openModal] = useRecoilState(SelectorOpenModal);

  return (
    <>
      {Modals.map((el, i) => (
        <Modal
          key={i}
          title={el.title}
          opened={el.id === activeModal}
          fullScreen={isDesktop ? el.fullScreen.desktop : el.fullScreen.mobile}
          centered
          onClose={() => openModal(null)}
          className={el.className}
        >
          {el.component}
        </Modal>
      ))}

      {children}
    </>
  );
};

export default ModalProvider;
