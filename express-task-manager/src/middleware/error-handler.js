import { StatusCodes } from "http-status-codes";
import { CustomErrorApi } from "../errors/custom-error-api.js";

function errorHandler(err, req, res) {
  if (err instanceof CustomErrorApi) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server error" });
}

export { errorHandler };
