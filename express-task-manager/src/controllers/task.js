"use strict";
import { StatusCodes } from "http-status-codes";
import { database } from "../libs/prisma.js";
import { asyncWrapper } from "../middleware/async-wrapper.js";

const getTasks = asyncWrapper(async (req, res) => {
  const { q, completed } = req.query;
  const tasks = await database.task.findMany({
    where: {
      OR: [
        {
          title: { contains: q },
        },
        {
          completed: !!Boolean(completed),
        },
      ],
    },
  });
  res.status(StatusCodes.OK).json({ tasks });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await database.task.findUnique({ where: { id } });
  res.status(StatusCodes.OK).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const newTask = req.body;
  console.log(newTask);
  const task = await database.task.create({ data: newTask });
  res.status(StatusCodes.CREATED).json(task);
});

const editTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const updateTask = req.body;
  const task = await database.task.update({
    where: { id },
    data: updateTask,
  });
  res
    .status(StatusCodes.OK)
    .json({ task, message: "Task updated successfully." });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await database.task
    .delete({ where: { id } })
    .catch((error) => error.meta);
  res.status(StatusCodes.OK).json({
    data: task?.cause ? task.cause : "Task deleted successfully",
  });
});
export { getTasks, getTask, createTask, editTask, deleteTask };
