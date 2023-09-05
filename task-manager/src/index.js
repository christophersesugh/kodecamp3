import http from "node:http";
import fs from "node:fs";
import url from "node:url";
import path from "node:path";

const PORT = 3000;

const currentModuleUrl = import.meta.url;
const currentModulePath = url.fileURLToPath(currentModuleUrl);
const currentDirectory = path.dirname(currentModulePath);

const databasePath = path.resolve(currentDirectory, "database", "db.json");
function sendResponse(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  return response.end(JSON.stringify(data, null, 2));
}

function readDatabase() {
  try {
    const databaseData = fs.readFileSync(databasePath, "utf-8");
    return JSON.parse(databaseData);
  } catch (error) {
    throw new Error("Error reading from database");
  }
}

function writeDatabase(data) {
  try {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error("Error writing to database");
  }
}

function serverHandler(request, response) {
  const { method, url: requestUrl, headers } = request;
  const parsedUrl = new URL(requestUrl, `http://${headers.host}`);
  if (method === "GET") {
    if (parsedUrl.pathname === "/tasks") {
      try {
        const data = readDatabase();
        sendResponse(response, 200, data);
      } catch (error) {
        sendResponse(response, 500, { message: "Internal server error" });
      }
    } else if (parsedUrl.pathname.startsWith("/tasks/")) {
      const taskId = parsedUrl.pathname.split("/")[2];
      try {
        const { tasks } = readDatabase();
        const task = tasks.find((task) => task.id === parseInt(taskId));
        // if () {
        //   sendResponse(response, 404, {
        //     message: `No task found with id: ${id}`,
        //   });
        // }
        sendResponse(response, 200, task);
      } catch (error) {
        sendResponse(response, 404, { message: "Task not found" });
      }
    } else {
      sendResponse(response, 404, { message: "URL Not found" });
    }
  } else if (method === "POST") {
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
  } else if (method === "PUT") {
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
  } else if (method === "PATCH") {
    if (parsedUrl.pathname.startsWith("/tasks/")) {
      const taskId = parsedUrl.pathname.split("/")[2];
      let updatedTask = "";
      console.log(taskId);
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
  } else if (method === "DELETE") {
    //handle DELETE method
  } else {
    sendResponse(response, 405, { message: "Method not allowed." });
  }
}

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
