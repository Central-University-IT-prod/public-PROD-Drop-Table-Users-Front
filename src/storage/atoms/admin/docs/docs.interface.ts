export interface AdminDocsInterface {
  name: string;
  description?: string;
  conditions: AdminDocsConditions[];
  // templateFile?:
  // обязательно или нет
}

export type AdminDocsConditions = {
  field: string;
  comparison: AdminDocsComparisons;
  value: string | number;
};

export type AdminDocsComparisons = "more" | "less" | "equals";
