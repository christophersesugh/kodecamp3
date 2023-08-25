const EventEmitter = require("events");

const ev = new EventEmitter();

ev.on("kodecamp", (eve) => {
  console.log("Event emitted:", eve);
});

ev.once("onetime", () => {
  console.log("Once event emitted");
});

// Emitting events
ev.emit("kodecamp", "some data in the event");
ev.emit("onetime");
ev.emit("onetime"); // This won't trigger the "once" listener again
