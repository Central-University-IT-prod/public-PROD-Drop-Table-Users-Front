import { AdminDocsConditions } from "@/storage";
import { calculateAge } from "@/utils";
import { DocsRuSex } from "@/enums";

const fields = {
  firstName: 0,
  lastName: 1,
  sex: 2,
  email: 3,
  birthdayDate: 4,
  team: 5,
};

export default function checkAdminDocs(
  docs: AdminDocsConditions[],
  userInfo: (string | number)[],
) {
  if (docs.length === 0) return false;

  const eachField = docs.map((doc) => checkCondition(doc, userInfo));
  return eachField.every((el) => el);
}

function checkCondition(
  condition: AdminDocsConditions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userInfo: (string | number)[],
) {
  const comparison = {
    more: ">",
    less: "<",
    equals: "==",
  };

  if (condition.field === "birthdayDate") {
    const ageUser = calculateAge(userInfo[fields.birthdayDate] as number);
    return eval(
      `!(${ageUser} ${comparison[condition.comparison]} ${condition.value})`,
    );
  }

  if (condition.field === "sex") {
    return DocsRuSex[userInfo[fields.sex]] === condition.value;
  }

  return true;
}
