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

// Function to retrieve a user by their ID
const getUserById = async (_id) => {
  // Check if the _id parameter is not provided or falsy, and if so, return false
  if (!_id) return false;

  try {
    // Use the UserSchema to find a user with the provided _id
    const data = await UserSchema.findById(_id).exec();

    if (!data) {
      // Handle the case where no user was found
      return null;
    }

    // If the query is successful, return the user data
    return data;
  } catch (error) {
    // Handle any errors that occurred during the database query
    console.error(error);
    throw error; // Re-throw the error to be handled further up the call stack
  }

};


// Function to store a user's refresh JWT token
const storeUserRefreshJWT = (_id, token) => {
  // Create and return a Promise to handle asynchronous operations
  return new Promise((resolve, reject) => {
    try {
      // Use the UserSchema to find and update a user document based on their _id
      UserSchema.findOneAndUpdate(
        { _id },
        {
          $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
        },
        { new: true }
      )
        .then((data) => {
          // If the update is successful and data is returned, resolve the Promise with the updated data
          if (data) {
            resolve(data);
          } else {
            // If no data is returned, reject the Promise with an error indicating that the document was not found
            reject(new Error("Document not found"));
          }
        })
        .catch((error) => {
          // If an error occurs during the update, reject the Promise with the error
          reject(error);
        });
    } catch (error) {
      // If an error occurs in the try block, reject the Promise with the error
      reject(error);
    }
  });
};

// Function to update a user's password
const updatePassword = async (input, newhashedPass) => {
  try {
    let query;

    // Check if the input appears to be an email
    if (input.includes('@')) {
      query = { email: input };
    } else {
      query = { phone: input };
    }

    // Attempt to find a user by email or phone and update their password
    const data = await UserSchema.findOneAndUpdate(
      query,
      {
        $set: { password: newhashedPass },
      },
      { new: true }
    ).exec();

    if (data) {
      // If data is found and updated successfully, return it
      return data;
    }

    // If no data is found, return null or handle it as needed
    return null;
  } catch (error) {
    // Handle any errors that occur during the operation
    console.log(error);
    throw error;
  }
};



export {
  insertUser,
  getUserByEmail,
  getUserByPhone,
  getUserById,
  storeUserRefreshJWT,
  updatePassword
};