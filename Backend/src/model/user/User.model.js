import { UserSchema } from "./User.schema.js";

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject(new Error('Email is required'));
      return;
    }

    UserSchema.findOne({ email })
      .then(data => {
        // Check if no user was found and resolve with null
        if (!data) {
          resolve(null);
        } else {
          resolve(data);
        }
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};



export {
  insertUser,
  getUserByEmail
};