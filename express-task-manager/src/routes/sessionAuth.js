import express from "express";
import { login, logout, me, register } from "../controllers/seessionAuth.js";
import { sessionAuth } from "../middleware/sessionAuth.js";
import {
  loginAuthValidationRegister,
  registerAuthValidationRegister,
  validateAuth,
} from "../middleware/authValidator.js";

const router = express.Router();
router.post(
  "/register",
  registerAuthValidationRegister,
  validateAuth,
  register
);
router.post("/login", loginAuthValidationRegister, validateAuth, login);
router.get("/me", sessionAuth, me);
router.get("/logout", logout);

export default router;
