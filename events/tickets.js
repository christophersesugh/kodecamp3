const { EventEmitter } = require("events");

class TicketManager extends EventEmitter {
  constructor(tickets) {
    super();
    this.tickets = tickets;
  }
  buy(email, price) {
    if (this.tickets > 0) {
      this.tickets--;
      this.emit("buy", email, price, Date.now());
      return;
    }
    this.emit(
      "err",
      new Error(
        "Sorry! We are out of tickets, wait for 24 hours for new tickets."
      )
    );
  }

  advertise(email) {
    this.emit("advertise", email);
  }
}

module.exports = TicketManager;
