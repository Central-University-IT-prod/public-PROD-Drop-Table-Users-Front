import { selector } from "recoil";
import { AtomMain } from "@/storage";

const _ = selector<number>({
  get: () => 1,
  key: "Selector/Main/CloseModal",
  set: ({ get, set }, steps) => {
    const state = get(AtomMain);
    const modals = [...state.modalHistory];

    if (typeof steps !== "number" || steps < 1) return;

    const endSlice = modals.length - steps;
    set(AtomMain, {
      ...state,
      modalHistory: modals.slice(0, endSlice < 0 ? 0 : endSlice),
    });
  },
});

export default _;
