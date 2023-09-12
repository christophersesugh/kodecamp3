"use strict";
import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getTask,
  getTasks,
} from "../controllers/task.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.patch("/:id", editTask);
router.delete("/:id", deleteTask);

export default router;
