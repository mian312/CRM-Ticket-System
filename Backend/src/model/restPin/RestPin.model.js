import { ResetSchema } from "./restPin.schema.js";
import { randomPinNumber } from "../../utils/randomGenerator.js";

const setPasswordResetPin = async (input) => {
  // Generate a random 6-digit pin
  const pinLength = process.env.PASSWORD_RESET_PIN_LENGTH;
  const randPin = await randomPinNumber(pinLength);

  // Create an object with the email and the generated pin
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

// Export the function to set the password reset pin in the database
export {
  setPasswordResetPin
};
