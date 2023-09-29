import { Router } from "express";
// import { route } from "./ticket.router";
import { getUserByEmail, getUserByPhone, insertUser } from "../model/user/User.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { createAccessJWT, createRefreshJWT } from "../helpers/jwt.helper.js";
const router = Router();

router.get("/", (req, res, next) => {
  //   console.log(name);
  // res.json({ message: "return form user router" });
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
  const accessJWT = await createAccessJWT(user.email);
  const refreshJWT = await createRefreshJWT(user.email);

  //^ Respond with a success message and the tokens
  return res.status(200).json({
    status: "success",
    message: "Login Successfully!",
    accessJWT,
    refreshJWT,
  });
});




export default router;
