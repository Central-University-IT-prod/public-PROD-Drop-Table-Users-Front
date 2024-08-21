import { atom } from "recoil";

import {
  AdminDocsInterface,
  AdminDocsComparisons,
  AdminDocsConditions,
} from "./docs.interface.ts";

const AtomAdminDocs = atom<AdminDocsInterface[]>({
  key: "Atom/AdminDocs",
  default: [],
});

export { AtomAdminDocs };
export type { AdminDocsInterface, AdminDocsComparisons, AdminDocsConditions };
