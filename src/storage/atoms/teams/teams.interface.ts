import { UserInfo } from "@/storage";

export interface AtomTeamInterface {
  choose: number;
  teams: {
    offset: number;
    hasMore: boolean;
    items: TeamInfoInterface[] | null;
  };
  my: TeamInfoInterface | null;
}

export interface TeamInfoInterface {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  bannerUrl: string;
  membersCount: number;
  users?: UserInfo[];
}
