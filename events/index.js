const TicketManager = require("./tickets");
const Database = require("./database");
const Email = require("./email");

const ticketManager = new TicketManager(3);
const database = new Database();
const emailService = new Email();

const handlePurchase = (email, price, timestamp) => {
  console.log("Ticket bought!");
  emailService.send(email);
  database.save(email, price, timestamp);
};

const handleError = (error) => {
  console.error(`Ooops!\n${error.message}`);
};

ticketManager.on("buy", handlePurchase);

ticketManager.on("err", handleError);

// ticketManager.on("advertise", (email) => {
//   console.log(`Advert notification sent to ${email} successfully.`);
// });

ticketManager.buy("kodecamp@gmail.com", 30);
ticketManager.buy("camp@gmail.com", 30);
ticketManager.buy("kode@gmail.com", 30);
ticketManager.buy("kodecamp@gmail.com", 30);

const result = ticketManager.listenerCount("buy");
const result2 = ticketManager.listenerCount("error");

console.log(`${result} sub. for the buy event`);
console.log(`${result2} sub. for the error event`);
