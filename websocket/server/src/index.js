import Ws from "ws";
const { WebSocketServer, WebSocket } = Ws;
const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log("Server running on port 8080");
});
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("a user just came online");
  ws.on("error", console.error);
  clients.add(ws);
  function broadcast(message) {
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
  ws.on("message", (message) => {
    console.log(message.toString());
    broadcast(message);
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("connection closed");
  });
});
