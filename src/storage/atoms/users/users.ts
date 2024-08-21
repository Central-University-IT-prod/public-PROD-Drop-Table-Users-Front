import { atom } from "recoil";

// import { MockUserInfo } from "@/mock";
import { UsersInterface, UserInfo } from "./users.interface.ts";

const AtomUsers = atom<UsersInterface>({
  key: "Atom/Users",
  default: {
    users: {
      offset: 0,
      hasMore: true,
      items: null,
    },
    my: null,
    sortBy: null,
  },
});

export { AtomUsers };
export type { UsersInterface, UserInfo };
