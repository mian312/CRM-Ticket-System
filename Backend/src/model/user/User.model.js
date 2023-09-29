import { UserSchema } from "./User.schema.js";

// Insert a new user to the application
const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// Get the user by email, for login
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

// Get the user by phone number, for login
const getUserByPhone = (phone) => {
  return new Promise((resolve, reject) => {
    if (!phone) {
      reject(new Error('Phone number is required'));
      return;
    }

    UserSchema.findOne({ phone })
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
  getUserByEmail,
  getUserByPhone
};