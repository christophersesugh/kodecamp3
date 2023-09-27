import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { asyncWrapper } from "../middleware/async-wrapper.js";
import { CustomErrorApi } from "../errors/custom-error-api.js";
import { database } from "../libs/prisma.js";

const register = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
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
  req.session.user = user;
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Registration successful.", errors: null });
});

const login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
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
  req.session.user = serializeUser(oldUser);
  res.status(StatusCodes.OK).json({ message: "Login success.", errors: null });
});

const me = asyncWrapper(async (req, res) => {
  const { id: userId, username } = req.user;
  const tasks = await database.task.findMany({ where: { userId } });
  res.status(StatusCodes.OK).json({ user: { id, username, tasks } });
});

const logout = asyncWrapper(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw new CustomErrorApi(
        "Internal server error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    res.redirect("/login");
  });
});
export { register, login, logout, me };
