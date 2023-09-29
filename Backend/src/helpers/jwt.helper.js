import jwt from "jsonwebtoken";

const createAccessJWT = (payload) => {
  const accessJWT = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  return Promise.resolve(accessJWT);
};

const createRefreshJWT = (payload) => {
  const refreshJWT = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30d",
  });

  return Promise.resolve(refreshJWT);
};

export { createAccessJWT, createRefreshJWT };
