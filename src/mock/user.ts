import { UserInfo } from "@/storage";

export const MockUsersForAdmin = [
  [
    "Иван",
    "Иванов",
    "Мужской",
    "ivan@example.com",
    1143892365 * 1000,
    "Команда А",
  ],
  [
    "Елена",
    "Петрова",
    "Женский",
    "elena@example.com",
    1104756765 * 1000,
    "Команда Б",
  ],
  [
    "Алексей",
    "Сидоров",
    "Мужской",
    "alexey@example.com",
    1199364765 * 1000,
    "",
  ],
  [
    "Мария",
    "Кузнецова",
    "Женский",
    "maria@example.com",
    1333370256 * 1000,
    "Команда В",
  ],
  [
    "Ярослав",
    "Попов",
    "Мужской",
    "yarigpopov@example.com",
    1230987165 * 1000,
    "Менторы",
  ],
];

export const MockUserInfo: UserInfo = {
  id: 1,
  team: -1,
  username: "username",
  tgLogin: "logintg",
  firstName: "Олеся",
  lastName: "Майстренко",
  birthdayDate: 1,
  registerAt: 1,
  group: "ADMIN",
  major: "FRONTEND",
  description: "",
};
