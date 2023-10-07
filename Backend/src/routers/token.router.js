import express from "express";
const router = express.Router();

import { verifyRefreshJWT, createAccessJWT } from "../helpers/jwt.helper.js";
import { getUserByEmail } from "../model/user/User.model.js";

router.get("/", async (req, res, next) => {
  const { authorization } = req.headers;

  // Verify the provided refresh JWT
  const decoded = await verifyRefreshJWT(authorization);

  if (decoded.email) {
    // Retrieve the user's profile by email
    const userProf = await getUserByEmail(decoded.email);

    if (userProf._id) {
      let tokenExp = userProf.refreshJWT.addedAt;
      const dBrefreshToken = userProf.refreshJWT.token;

      // Calculate the expiration date of the token
      tokenExp = tokenExp.setDate(
        tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
      );

      const today = new Date();

      // Check if the provided refresh token matches the stored token and if it's expired
      if (dBrefreshToken !== authorization && tokenExp < today) {
        return res.status(403).json({ message: "Authentication Expired" });
      }

      // Generate a new access JWT
      const accessJWT = await createAccessJWT(
        decoded.email,
        userProf._id.toString()
      );

      return res.json({ status: "success", accessJWT });
    }
  }

  // If no valid JWT is provided or user not found, return a Forbidden response
  return res.status(403).json({ message: "Forbidden" });
});

export default router;
