import { ResetSchema } from "./restPin.schema.js";
import { randomPinNumber } from "../../utils/randomGenerator.js";
import * as mongoose from 'mongoose';

//* Function to set the password reset pin in the database
const setPasswordResetPin = async (input) => {
  // Generate a random 6-digit pin
  const pinLength = process.env.PASSWORD_RESET_PIN_LENGTH;
  const randPin = await randomPinNumber(pinLength);

  // Create an object with the input and the generated pin
  const resetObj = {
    input,
    pin: randPin,
  };

  return new Promise((resolve, reject) => {
    // Save the reset pin object to the ResetSchema
    ResetSchema(resetObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

//* Function to get the password reset pin by email and pin
const getPinByInput = async (input, pin) => {
  try {
    // Attempt to find a document in the ResetSchema that matches the provided input and PIN
    const data = await ResetSchema.findOne({ input, pin }).exec();

    if (data) {
      // If data is found, return it
      return data;
    }

    // If no data is found, return false
    return false;
  } catch (error) {
    // Handle any errors that occur during the operation
    console.log(error.message);
    throw error;
  }
};



//* Function to delete the password reset pin by input and pin
const deletePin = async (input, pin) => {
  try {
    // Store the result of the findOneAndDelete operation in a variable
    const result = await ResetSchema.findOneAndDelete({ input, pin }).exec();
    if (result) {
      // The document was deleted successfully
      console.log('Pin deleted.');
    } else {
      console.log('Pin not found.');
    }
  } catch (error) {
    // Handle any errors that occur
    console.log(error);
    throw error;
  }
};


// Export the function to set the password reset pin in the database
export {
  setPasswordResetPin,
  getPinByInput,
  deletePin
};
