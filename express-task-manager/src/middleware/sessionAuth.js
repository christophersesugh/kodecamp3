import { StatusCodes } from "http-status-codes";
import { CustomErrorApi } from "../errors/custom-error-api.js";

async function sessionAuth(req, res, next) {
  try {
    if (!req.session.user) {
      throw new CustomErrorApi("Unauthorized.", StatusCodes.UNAUTHORIZED);
    }
    req.user = req.session.user;
    next();
  } catch (error) {
    throw new CustomErrorApi("Unauthorized.", StatusCodes.UNAUTHORIZED);
  }
}

export { sessionAuth };
