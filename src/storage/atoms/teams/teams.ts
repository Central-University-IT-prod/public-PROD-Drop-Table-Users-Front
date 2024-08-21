import { atom } from "recoil";

import { AtomTeamInterface, TeamInfoInterface } from "./teams.interface.ts";

const AtomTeams = atom<AtomTeamInterface>({
  key: "Atom/Teams",
  default: {
    choose: -1,
    teams: {
      offset: 0,
      hasMore: true,
      items: null,
    },
    my: null,
  },
});

export { AtomTeams };
export type { AtomTeamInterface, TeamInfoInterface };
