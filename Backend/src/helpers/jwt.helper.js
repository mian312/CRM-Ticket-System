import jwt from "jsonwebtoken";
import { setJWT } from "./redis.helper.js";
import { storeUserRefreshJWT } from "../model/user/User.model.js";

//* Create an access JWT token
const createAccessJWT = async (email, _id) => {
  try {
    //^ Sign the JWT token with the user's email and set an expiration of 15 minutes
    const accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    //^ Store the JWT token in Redis using the user's _id as the key
    await setJWT(accessJWT, _id);

    //^ Resolve the access JWT token
    return Promise.resolve(accessJWT);
  } catch (error) {
    //^ Reject the promise if there's an error
    return Promise.reject(error);
  }
};

//* Create a refresh JWT token
//^ Sign the JWT token with the provided payload and set an expiration of 30 days
const createRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30d",
    });

    //^ Store the JWT token using the user's _id as the key
    await storeUserRefreshJWT(_id, refreshJWT);

    //^ Resolve the refresh JWT token
    return Promise.resolve(refreshJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

// //* Create a verify JWT token
// const verifyAccessJWT = (userJWT) => {
//   try {
//     //^ Resolve the verify JWT token
//     return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
//   } catch (error) {
//     return Promise.resolve(error);
//   }
// };

//* Create verify JWT token which is not a promise
const verifyAccessJWT = (userJWT) => {
  try {
    return jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return error;
  }
}


export {
  createAccessJWT,
  createRefreshJWT,
  verifyAccessJWT
};
