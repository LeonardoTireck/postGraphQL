import express from "express";
import { body } from "express-validator";
import { User } from "../models/user.js";
import {
  getUserStatus,
  login,
  signUp,
  updateUserStatus,
} from "../controllers/auth.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid e-mail.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail already exists.");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  signUp
);

router.post("/login", login);

router.get("/status", isAuth, getUserStatus);

router.patch(
  "/status",
  isAuth,
  [body("status").trim().not().isEmpty()],
  updateUserStatus
);

export default router;
