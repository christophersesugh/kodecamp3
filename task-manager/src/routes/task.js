import {
  createTask,
  deleteTask,
  editTask,
  editWholeTask,
  fetchTask,
  fetchTasks,
} from "../controllers/task.js";
import { sendResponse } from "../utils/send-response.js";

function serverHandler(request, response) {
  const { method, url: requestUrl, headers } = request;
  const parsedUrl = new URL(requestUrl, `http://${headers.host}`);
  if (method === "GET") {
    if (parsedUrl.pathname === "/tasks") {
      fetchTasks(response);
    } else if (parsedUrl.pathname.startsWith("/tasks/")) {
      fetchTask(response, parsedUrl);
    } else {
      sendResponse(response, 404, { message: "path Not found" });
    }
  } else if (method === "POST") {
    createTask(request, response, parsedUrl);
  } else if (method === "PUT") {
    editWholeTask(request, response, parsedUrl);
  } else if (method === "PATCH") {
    editTask(request, response, parsedUrl);
  } else if (method === "DELETE") {
    deleteTask(response, parsedUrl);
  } else {
    sendResponse(response, 405, { message: "Method not allowed." });
  }
}

export { serverHandler };
