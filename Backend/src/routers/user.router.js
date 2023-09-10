import { Router } from "express";
// import { route } from "./ticket.router";
import { insertUser } from "../model/user/User.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";
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
export default router;
