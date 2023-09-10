import { Router } from "express";
// import { route } from "./ticket.router";
import { getUserByEmail, insertUser } from "../model/user/User.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
const router = Router();

router.all("/", (req, res, next) => {
//   console.log(name);
  // res.json({ message: "return form user router" });
  next();
});


router.post("/", async (req, res) => {
  const { name, address, phone, email, password } = req.body;

  try {
    //hash password
    const hashedPass = await hashPassword(password);

    const newUserObj = {
      name,
      address,
      phone,
      email,
      password: hashedPass,
    };
    const result = await insertUser(newUserObj);
    // console.log(result);

    res.json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
    res.json({ statux: "error", message: error.message });
  }
});

//User sign in Router
router.post("/login", async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid form submition!" });
  }

  const user = await getUserByEmail(email);

  const passFromDb = user && user._id ? user.password : null;

  if (!passFromDb)
    return res.json({ status: "error", message: "Invalid email or password!" });

  const result = await comparePassword(password, passFromDb);
  // console.log(result);

  res.json({ status: "success", message: "Login Successfully!" });
});

export default router;
