import { Router } from "express";
// import { route } from "./ticket.router";
import { getUserByEmail, getUserById, getUserByPhone, insertUser, storeUserRefreshJWT, updatePassword } from "../model/user/User.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { createAccessJWT, createRefreshJWT } from "../helpers/jwt.helper.js";
import { userAuthorization } from "../middleware/authorization.middleware.js";
import { deletePin, getPinByInput, setPasswordResetPin } from "../model/restPin/RestPin.model.js";
import { emailProcessor, smsProcessor } from "../helpers/pin.helper.js";
import { resetPassReqValidation, updatePassValidation } from "../middleware/formValidation.middleware.js";
import { deleteJWT } from "../helpers/redis.helper.js";
const router = Router();

router.get("/", (req, res, next) => {
  //   console.log(name);
  res.json({ message: "return form user router" });
  next();
});

//* User Sign Up Route
router.post("/signup", async (req, res) => {
  const { name, address, phone, email, password } = req.body;

  //^ Hash password
  const hashedPass = await hashPassword(password);

  const newUserObj = {
    name,
    address,
    phone,
    email,
    password: hashedPass,
  };

  try {
    const result = await insertUser(newUserObj);



    res.json({ message: "New user created", result });
  } catch (error) {
    // console.error(error);
    //^ Check if MongoDB returns a duplicate key error for email or phone
    if (error.code === 11000) {
      let errorMessage = "Duplicate key error";
      if (error.keyPattern.email) {
        errorMessage = "Email address is already in use.";
      }
      else if (error.keyPattern.phone) {
        errorMessage = "Phone number is already in use.";
      }
      return res.status(400).json({ status: "error", message: errorMessage });
    } else {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }
});


//* User Sign In Route
router.post("/login", async (req, res) => {
  try {
    const { input, password } = req.body;

    //^ Check if both input and password are provided
    if (!input || !password) {
      return res.status(400).json({ status: "error", message: "Invalid form submission!" });
    }

    //^ Check if the input is an email or phone number
    let user;
    if (input.includes('@')) {
      //^ Input is an email, use getUserByEmail to fetch user data
      user = await getUserByEmail(input);
    } else {
      //^ Input is a phone number, use getUserByPhone to fetch user data
      user = await getUserByPhone(input);
    }

    //^ Check if a user with the given input exists
    const passFromDb = user && user._id ? user.password : null;

    if (!passFromDb) {
      return res.status(400).json({ status: "error", message: "Invalid user input!" });
    }

    //^ Check if the user has provided the correct password
    const result = await comparePassword(password, passFromDb);

    if (!result) {
      return res.status(400).json({ status: "error", message: "Invalid password!" });
    }

    //^ Generate access and refresh JWT tokens
    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);
    const accessJWT = await createAccessJWT(user.email, `${user._id}`);
    /**
     * ${user._id} converts the _id value (which might be a number) to a string, regardless of whether _id is originally a string or a number.
     */

    //^ Respond with a success message and the tokens
    return res.status(200).json({
      status: "success",
      message: "Login Successfully!",
      accessJWT,
      refreshJWT,
    });
  } catch (error) {
    console.error(error);

    //^ Handle other errors that might occur during login
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
});


//* Get user profile router
router.post("/", userAuthorization, async (req, res) => {
  //^ get user id from request object
  const _id = req.userId;
  //^ get user profile based on the user _id
  const userProf = await getUserById(_id);

  return res.json({ user: userProf });
});


//* Reset user password router
router.post("/reset-password", resetPassReqValidation, async (req, res) => {
  const { input } = req.body;

  //^ Check if the input is an email or phone number
  let user;
  if (input.includes('@')) {
    //^ Input is an email, use getUserByEmail to fetch user data
    user = await getUserByEmail(input);
  } else {
    //^ Input is a phone number, use getUserByPhone to fetch user data
    user = await getUserByPhone(input);
  }

  if (user && user._id) {
    //^ create unique 6 digit pin
    const setPin = await setPasswordResetPin(input);
    // return res.json(setPin);
    let result;
    if (input.includes('@')) {
      //^ Input is an email, use getUserByEmail to fetch user data
      await emailProcessor({
        email: input,
        pin: setPin.pin,
        type: "request-new-password",
      });
    } else {
      //^ Input is a phone number, use getUserByPhone to fetch user data
      await smsProcessor({
        phoneNumber: input,
        pin: setPin.pin,
        type: "request-new-password",
      });

    }

    return res.json({
      status: "success",
      message:
        "You should be receive a pin shortly. Please check your email or phone number and try again",
    });
  }

  return res.json({
    status: "error",
    message:
      "couldn't find user with the given input. Please check your input and try again",
  });
});


/**
 * Endpoint for resetting the user's password.
 */
router.patch("/reset-password", updatePassValidation, async (req, res) => {
  // 1. Extract email, PIN, and new password from the request body
  const { input, pin, newPassword } = req.body;

  // 2. Check if the provided PIN is valid and exists in the database
  const getPin = await getPinByInput(input, pin);

  if (getPin._id) {
    // 3. Check if the PIN hasn't expired
    const dbDate = getPin.addedAt;
    const expiresIn = 1;

    let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);

    const today = new Date();

    if (today > expDate) {
      // 4. If the PIN is expired, return an error response
      return res.json({ status: "error", message: "Invalid or expired PIN." });
    }

    // 5. Encrypt the new password
    const hashedPass = await hashPassword(newPassword);

    // 6. Update the user's password in the database
    const user = await updatePassword(input, hashedPass);

    if (user._id) {
      // 7. Send an email or sms notification for the password update
      if (input.includes('@')) {
        await emailProcessor({
          email: input,
          pin: pin,
          type: "update-password-success"
        });
      } else {
        await smsProcessor({
          phoneNumber: input,
          pin: pin,
          type: "update-password-success"
        });
      }

      // 8. Delete the used PIN from the database
      deletePin(input, pin);

      // 9. Return a success response
      return res.json({
        status: "success",
        message: "Your password has been updated.",
      });
    }
  }

  // 10. If any step fails, return an error response
  res.json({
    status: "error",
    message: "Unable to update your password. Please try again later.",
  });
});


//* User logout and invalidate jwts

router.delete("/logout", userAuthorization, async (req, res) => {
  const { authorization } = req.headers;
  //^ this data coming form database
  const _id = req.userId;

  //^ delete accessJWT from redis database
  deleteJWT(authorization);

  //^ delete refreshJWT from mongodb
  const result = await storeUserRefreshJWT(_id, "");

  if (result._id) {
    return res.json({ status: "success", message: "Loged out successfully" });
  }

  res.json({
    status: "error",
    message: "Unable to logg you out, plz try again later",
  });
});



export default router;
