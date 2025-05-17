class Subscriber {
  constructor(id) {
    this.id = id;
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(message);
  }
}

module.exports = Subscriber;
