"use strict";
import { StatusCodes } from "http-status-codes";
import { database } from "../libs/prisma.js";
import { asyncWrapper } from "../middleware/async-wrapper.js";

const getTasks = asyncWrapper(async (req, res) => {
  const {
    user: { id: userId },
  } = req.body;

  const { q, completed } = req?.query;
  let comp;
  if (completed) {
    comp = JSON.parse(completed);
  }
  const tasks = await database.task.findMany({
    where: { userId, OR: [{ title: q }, { completed: comp }] },
  });
  res.status(StatusCodes.OK).json({ tasks });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const {
    user: { id: userId },
  } = req.body;
  const task = await database.task.findUnique({
    where: { id, userId },
  });
  res.status(StatusCodes.OK).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const {
    title,
    description,
    user: { id },
  } = req.body;

  const task = await database.task.create({
    data: { title, description, userId: id },
  });
  res.status(StatusCodes.CREATED).json(task);
});

const editTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    user: { id: userId },
  } = req.body;
  const task = await database.task.update({
    data: { title, description },
    where: { id, userId },
  });
  res
    .status(StatusCodes.OK)
    .json({ task, message: "Task updated successfully." });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const {
    user: { id: userId },
  } = req.body;
  const { id } = req.params;
  const task = await database.task
    .delete({ where: { id, userId } })
    .catch((error) => error.meta);
  res.status(StatusCodes.OK).json({
    data: task?.cause ? task.cause : "Task deleted successfully",
  });
});
export { getTasks, getTask, createTask, editTask, deleteTask };
