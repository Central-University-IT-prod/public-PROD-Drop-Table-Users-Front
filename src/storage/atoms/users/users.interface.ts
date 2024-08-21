export interface UsersInterface {
  users: {
    offset: number;
    hasMore: boolean;
    items: null | UserInfo[];
  };
  my: UserInfo | null;
  sortBy: string | null;
}

export interface UserInfo {
  id: number;
  username: string;
  description: string;
  tgLogin: string;
  firstName: string;
  lastName: string;
  birthdayDate: number;
  registerAt: number;
  group:
    | "ADMIN"
    | "MEMBER"
    | "OLD_MEMBER"
    | "NOT_VERIFIED"
    | "MENTOR"
    | "JURY"
    | "ORGANIZER"
    | "PRODUCT";
  major: "BACKEND" | "FRONTEND" | "MOBILE";
  team: number;
}
