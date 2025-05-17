const express = require("express");
const notifier = require("../observers/Notifier");
const logger = require("../utils/logger");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

const getNotifications = async (req, res) => {
  try {
    const subscriber = notifier.getSubscriber(req.user.id);
    const messages = subscriber.messages;
    res.json(messages);
  } catch (error) {
    logger.error("Error fetching messages.", {
      errorMessage: error.message,
    });
    res.status(500).json({ message: " Failed to retrieve user messages." });
  }
};

router.route("/").get(protect, getNotifications);

module.exports = router;
