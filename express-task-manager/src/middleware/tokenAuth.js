import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { CustomErrorApi } from "../errors/custom-error-api.js";

const SECRET = process.env.SECRET;

async function tokenAuth(req, res, next) {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer")) {
    throw new CustomErrorApi("Unauthorized.", StatusCodes.UNAUTHORIZED);
  }
  const token = headers.split(" ")[1];
  try {
    const user = jwt.verify(token, SECRET);
    req.user = { id: user.id, username: user.username };
    next();
  } catch (error) {
    throw new CustomErrorApi("Unauthorized.", StatusCodes.UNAUTHORIZED);
  }
}

export { tokenAuth };
