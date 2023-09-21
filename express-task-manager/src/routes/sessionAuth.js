import express from "express";
import { login, logout, me, register } from "../controllers/seessionAuth.js";
import { sessionAuth } from "../middleware/sessionAuth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", sessionAuth, me);
router.get("/logout", logout);

export default router;
