import { selector } from "recoil";
import { AtomMain } from "@/storage";

const _ = selector<string | null>({
  key: "Selector/Main/OpenModal",
  get: ({ get }) => {
    const modals = get(AtomMain).modalHistory;
    if (modals.length === 0) return null;

    return modals[modals.length - 1];
  },
  set: ({ get, set }, id) => {
    const state = get(AtomMain);
    const modals = [...state.modalHistory];

    if (typeof id === "string") {
      modals.push(id);
    } else {
      modals.splice(modals.length - 1, 1);
    }

    set(AtomMain, { ...state, modalHistory: modals });
  },
});

export default _;
