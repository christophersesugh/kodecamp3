import { readDatabase, writeDatabase } from "../model/task.js";
import { sendResponse } from "../utils/send-response.js";

/**
 * fetchTasks - fetches and return all the tasks.
 * @param {Object} response
 * @return {Array}
 */
function fetchTasks(response) {
  try {
    const data = readDatabase();
    sendResponse(response, 200, data);
  } catch (error) {
    sendResponse(response, 500, { message: "Internal server error." });
  }
}

/**
 * fetchTask - fetch and return a single task.
 * @param {Object} response
 * @param {String} parsedUrl
 * @return {Object}
 */
function fetchTask(response, parsedUrl) {
  const taskId = parsedUrl.pathname.split("/")[2];
  try {
    const { tasks } = readDatabase();
    const task = tasks.find((task) => task.id === parseInt(taskId));
    sendResponse(response, 200, task);
  } catch (error) {
    sendResponse(response, 404, { message: "Task not found" });
  }
}

/**
 * createTask - adds a new task to the database
 * @param {Object} request
 * @param {Object} response
 * @param {String} parsedUrl
 * @return {Object}
 */
function createTask(request, response, parsedUrl) {
  if (parsedUrl.pathname === "/tasks") {
    let newTask = "";
    try {
      request.on("data", (chunk) => {
        newTask += chunk;
      });

      request.on("end", () => {
        const data = readDatabase();
        data.tasks.push(JSON.parse(newTask));
        writeDatabase(data);
        sendResponse(response, 201, {
          message: "Task created successfully.",
        });
      });
    } catch (error) {
      sendResponse(response, 500, "Error creating task");
    }
  } else {
    sendResponse(response, 404, { message: "Not found" });
  }
}

function editWholeTask(request, response, parsedUrl) {
  if (parsedUrl.pathname.startsWith("/tasks/")) {
    const taskId = parsedUrl.pathname.split("/")[2];
    let updatedTask = "";
    try {
      request.on("data", (chunk) => {
        updatedTask += chunk;
      });

      request.on("end", () => {
        const data = readDatabase();
        const { tasks } = data;
        const taskIndex = tasks.findIndex(
          (task) => task.id === parseInt(taskId)
        );
        if (taskIndex !== -1) {
          tasks[taskIndex] = JSON.parse(updatedTask);
          writeDatabase(data);
          sendResponse(response, 200, {
            message: "Task updated successfully.",
          });
        } else {
          sendResponse(response, 404, {
            message: `Task with given id ${taskId} not found.`,
          });
        }
      });
    } catch (error) {
      sendResponse(response, 500, { message: "Internal server error." });
    }
  } else {
    sendResponse(response, 404, { message: "URL not found." });
  }
}
function editTask(request, response, parsedUrl) {
  if (parsedUrl.pathname.startsWith("/tasks/")) {
    const taskId = parsedUrl.pathname.split("/")[2];
    let updatedTask = "";
    try {
      request.on("data", (chunk) => {
        updatedTask += chunk;
      });

      request.on("end", () => {
        const data = readDatabase();
        const { tasks } = data;
        const taskIndex = tasks.findIndex(
          (task) => task.id === parseInt(taskId)
        );
        if (taskIndex !== -1) {
          updatedTask = JSON.parse(updatedTask);
          // const updateTask = { ...tasks[taskIndex], ...updatedTask };
          const updateTask = Object.assign({}, tasks[taskIndex], updatedTask);
          tasks[taskIndex] = updateTask;
          writeDatabase(data);
          sendResponse(response, 200, {
            message: "Task updated successfully.",
          });
        } else {
          sendResponse(response, 404, {
            message: `Task with given id ${taskId} not found.`,
          });
        }
      });
    } catch (error) {
      sendResponse(response, 500, { message: "Internal server error." });
    }
  } else {
    sendResponse(response, 404, { message: "URL not found." });
  }
}
function deleteTask(response, parsedUrl) {
  if (parsedUrl.pathname.startsWith("/tasks/")) {
    const taskId = parsedUrl.pathname.split("/")[2];
    try {
      const data = readDatabase();
      const { tasks } = data;
      const updatedTasks = tasks.filter((task) => task.id !== parseInt(taskId));
      if (updatedTasks.length !== tasks.length) {
        writeDatabase({ tasks: updatedTasks });
        sendResponse(response, 200, {
          message: "Task deleted successfully.",
        });
      } else {
        sendResponse(response, 404, { message: "Task not found." });
      }
    } catch (error) {
      sendResponse(response, 500, { message: "Internal server error" });
    }
  }
}

export {
  fetchTasks,
  fetchTask,
  createTask,
  editWholeTask,
  editTask,
  deleteTask,
};
