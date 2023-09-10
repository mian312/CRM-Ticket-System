import { Router } from "express";
const router = Router();

router.all("/", (req, res, next) => {
//   console.log(name);
  res.json({ message: "return form user router" });
});



export default router;
