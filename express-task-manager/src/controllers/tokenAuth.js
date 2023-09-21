import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { asyncWrapper } from "../middleware/async-wrapper.js";
import { CustomErrorApi } from "../errors/custom-error-api.js";
import { database } from "../libs/prisma.js";

const SECRET = process.env.SESSION_SECRET;

const register = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomErrorApi("Invalid credentials", StatusCodes.BAD_REQUEST);
  }

  if (username.length < 5) {
    throw new CustomErrorApi("Username must be atleast 5 chars.");
  }

  if (password.length < 6) {
    throw new CustomErrorApi("Password must be atleast 6 chars.");
  }
  const oldUser = await database.user.findFirst({ where: { username } });
  if (oldUser) {
    throw new CustomErrorApi(
      `User with username ${username} already exists.`,
      StatusCodes.BAD_REQUEST
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await database.user.create({
    data: { username, passwordHash },
    select: { id: true, username: true },
  });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: "7d",
  });
  res
    .status(StatusCodes.CREATED)
    .json({ token, message: "Registration successful." });
});

const login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomErrorApi(
      "Provide all input values.",
      StatusCodes.BAD_REQUEST
    );
  }
  const oldUser = await database.user.findUnique({
    where: { username },
  });
  if (!oldUser) {
    throw new CustomErrorApi("Invalid credentials.", StatusCodes.BAD_REQUEST);
  }

  const correctPassword = await bcrypt.compare(password, oldUser.passwordHash);
  if (!correctPassword) {
    throw new CustomErrorApi("Invalid credentials", StatusCodes.BAD_REQUEST);
  }

  function serializeUser(user) {
    return { id: user.id, username: user.username };
  }

  res.status(StatusCodes.OK).json({ message: "Login success." });
});

const me = asyncWrapper(async (req, res) => {
  const { id, username } = req.session.user;
  const tasks = await database.task.findMany({ where: { userId: id } });
  res.status(StatusCodes.OK).json({ user: { id, username, tasks } });
});

export { register, login, me };
