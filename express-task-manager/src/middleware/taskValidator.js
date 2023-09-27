import { check, param, query, validationResult } from "express-validator";

const taskChars = 4;
const descChars = 20;

const createTasksValidationRegister = [
  check("title")
    .notEmpty()
    .withMessage("task title required")
    .isLength({ min: taskChars })
    .withMessage(`task title must be at least ${taskChars} characters long.`),
  check("description")
    .notEmpty()
    .withMessage("task description required")
    .isLength({ min: descChars })
    .withMessage(
      `task description must be at least ${descChars} characters long.`
    ),
];

const getTaskValidationRegister = [
  param("id").notEmpty().withMessage("id is required to get a task"),
];

const getTasksValidationRegister = [
  query("title").notEmpty().trim(),
  query("completed").notEmpty().toBoolean(),
];

const validateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ tasks: null, errors: errors.array() });
  }
  next();
};

export {
  createTasksValidationRegister,
  getTaskValidationRegister,
  getTasksValidationRegister,
  validateTask,
};
