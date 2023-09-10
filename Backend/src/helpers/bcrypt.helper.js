import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, saltRounds);
};

const comparePassword = async (plainPass, passFromDb) => {
  try {
    const result = await bcrypt.compare(plainPass, passFromDb);
    return result;
  } catch (err) {
    throw err;
  }
};

export {
  hashPassword,
  comparePassword
};
