import express from "express";
import { login, me, register } from "../controllers/tokenAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", me);

export default router;