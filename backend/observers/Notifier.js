class Notifier {
  constructor() {
    this.subscribers = [];
  }

  addSubscriber(subscriber) {
    for (var key in this.subscribers) {
      const subsc = this.subscribers[key];
      if (subsc.id === subscriber.id) {
        return;
      }
    }
    this.subscribers.push(subscriber);
    // console.log(subscriber);
    // console.log(this.subscribers);
  }

  removeSubscriber(subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  notifySubscribers(message) {
    for (var key in this.subscribers) {
      const subscriber = this.subscribers[key];
      subscriber.addMessage(message);
    }
  }

  getSubscriber(id) {
    for (var key in this.subscribers) {
      const subscriber = this.subscribers[key];
      if (subscriber.id === id) {
        return subscriber;
      }
    }
  }
}

const notifier = new Notifier();
module.exports = notifier;
