const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const logger = require("./utils/logger");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/loans", require("./routes/loanRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));
app.use("/api/notifications", require("./routes/notifierRoutes"));

// Export the app object for testing
if (require.main === module) {
  connectDB();
  // If the file is run directly, start the server
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}

module.exports = app;
