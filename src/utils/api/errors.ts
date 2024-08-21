import * as Errors from "./errors/index.ts";

const errors: { [key: string]: { [key: number]: string } } = {
  "users/login": Errors.UsersLogin,
  "users/register": Errors.UsersRegister,
};

export default errors;
