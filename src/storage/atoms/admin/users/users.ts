import { atom } from "recoil";

interface UserI {
  users: Array<string | number | boolean>[];
  selectRows: number[];
  sortByDoc: number;
}

const AtomAdminUsers = atom<UserI>({
  key: "Atom/AdminUsers",
  default: {
    users: [],
    selectRows: [],
    sortByDoc: 0,
  },
});

export { AtomAdminUsers };
