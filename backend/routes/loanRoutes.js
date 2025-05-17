const express = require("express");
const ProxyController = require("../controllers/ProxyController");
const LoanController = require("../controllers/loanController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

const getLoans = async (req, res) => {
  if (req.user.role === "admin") {
    LoanController.getLoans(req, res);
  } else {
    ProxyController.getLoans(req, res);
  }
};

const addLoan = LoanController.addLoan;
const updateLoan = LoanController.updateLoan;
const deleteLoan = LoanController.deleteLoan;

router.route("/").get(protect, getLoans).post(protect, addLoan);
router.route("/:id").put(protect, updateLoan).delete(protect, deleteLoan);

// 🔔 Route to manually trigger due-soon check & notify users
router.route("/check/notifications").get(protect, async (req, res) => {
  try {
    await checkDueSoonLoans();
    res.json({ message: "Checked and notified users with loans due soon." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
