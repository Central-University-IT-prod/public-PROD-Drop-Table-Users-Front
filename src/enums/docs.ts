import { AdminDocsComparisons } from "@/storage";

export const DocsFields: { [key: string]: string } = {
  birthdayDate: "Возраст",
  sex: "Пол",
};

export const DocsComparisonBySymbol = {
  more: ">",
  less: "<",
  equals: "==",
};

export const DocsComparison = {
  more: "Больше",
  less: "Меньше",
  equals: "Равно",
};

export const DocsComparisonList: AdminDocsComparisons[] = [
  "more",
  "less",
  "equals",
];

export enum DocsSex {
  "male" = "Мужской",
  "female" = "Женский",
}

export const DocsRuSex: { [key: string]: string } = {
  Мужской: "male",
  Женский: "female",
};
