import { UsersModel } from "../schemas/user.schema";
import { genSaltSync, hashSync } from "bcrypt";

export const usersSeeders = async () => {
  const salt = genSaltSync(10);

  const data = [
    {
      email: "bryandavidaaa1@gmail.com",
      password: hashSync("bryan12345", salt),
      username: "brysanabria1",
      is_forgot_password: false,
      phone_number: "584121052563",
    },
    {
      email: "bryandavidaaa2@gmail.com",
      password: hashSync("bryan12345", salt),
      username: "brysanabria2",
      is_forgot_password: false,
      phone_number: "584121052562",
    },
    {
      email: "bryandavidaaa3@gmail.com",
      password: hashSync("bryan12345", salt),
      username: "brysanabria3",
      is_forgot_password: false,
      phone_number: "584121052561",
    },
  ];

  await UsersModel.create(data);
  console.log("users seeders finish");
};
