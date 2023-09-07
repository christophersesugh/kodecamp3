function sendResponse(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  return response.end(JSON.stringify(data, null, 2));
}

export { sendResponse };
