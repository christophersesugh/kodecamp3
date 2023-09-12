"use strict";
import { StatusCodes } from "http-status-codes";
import { database } from "../libs/prisma.js";
import { asyncWrapper } from "../middleware/async-wrapper.js";

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await database.task.findMany();
  res.status(StatusCodes.OK).json({ tasks });
});

const getTask = async (req, res) => {
  res.send("Hello router from controllers");
};

const createTask = asyncWrapper(async (req, res) => {
  const newTask = req.body;
  const task = await database.task.create({ data: newTask });
  res.status(StatusCodes.CREATED).json(task);
});

const editTask = async (req, res) => {
  res.send("Hello router from controllers");
};

const deleteTask = async (req, res) => {
  res.send("Hello router from controllers");
};

export { getTasks, getTask, createTask, editTask, deleteTask };
