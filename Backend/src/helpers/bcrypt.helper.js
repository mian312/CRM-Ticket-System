import { hashSync } from "bcrypt";
const saltRounds = 10;

const hashPassword = (plainPassword) => {
  return new Promise((resolve) => {
    resolve(hashSync(plainPassword, saltRounds));
  });
};

export {
  hashPassword,
};