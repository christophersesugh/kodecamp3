"use strict";
import { StatusCodes } from "http-status-codes";
import { database } from "../libs/prisma.js";
import { asyncWrapper } from "../middleware/async-wrapper.js";

const getTasks = asyncWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { q, completed } = req.query;
  const tasks = await database.task.findMany({
    where: {
      userId,
      OR: [{ title: q }, { completed: completed === "true" ? true : false }],
    },
  });
  res.status(StatusCodes.OK).json({ tasks, errors: null });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const task = await database.task.findUnique({
    where: { id, userId },
  });
  res.status(StatusCodes.OK).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const { title, description } = req.body;
  const { id: userId } = req.user;

  const task = await database.task.create({
    data: { title, description, userId },
  });
  res.status(StatusCodes.CREATED).json({ task, errors: null });
});

const editTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const { id: userId } = req.user;

  const task = await database.task.update({
    data: { title, description },
    where: { id, userId },
  });
  res.status(StatusCodes.OK).json({ task, errors: null });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const task = await database.task
    .delete({ where: { id, userId } })
    .catch((error) => error.meta);
  res.status(StatusCodes.OK).json({
    task: task ? task : null,
    errors: task?.cause ? task.cause : null,
  });
});
export { getTasks, getTask, createTask, editTask, deleteTask };
