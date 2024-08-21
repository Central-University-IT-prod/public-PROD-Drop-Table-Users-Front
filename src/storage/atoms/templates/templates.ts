import { atom } from "recoil";

const AtomTemplates = atom<{ items: string[]; req: false }[]>({
  key: "Atom/Templates",
  default: [],
});

export { AtomTemplates };
