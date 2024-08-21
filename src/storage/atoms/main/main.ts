import { atom } from "recoil";
import AtomMainInterface from "./main.interface.ts";

const AtomMain = atom<AtomMainInterface>({
  key: "Atom/Main",
  default: {
    isDesktop: false,
    modalHistory: [],
  },
});

export { AtomMain };
export type { AtomMainInterface };
