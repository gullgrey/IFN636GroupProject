
const express = require('express');
const { getLoans, addLoan, updateLoan, deleteLoan } = require('../controllers/loanController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getLoans).post(protect, addLoan);
router.route('/:id').put(protect, updateLoan).delete(protect, deleteLoan);
// 🔔 Route to manually trigger due-soon check & notify users
router.route('/check/notifications').get(protect, async (req, res) => {
  try {
    await checkDueSoonLoans();
    res.json({ message: 'Checked and notified users with loans due soon.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
