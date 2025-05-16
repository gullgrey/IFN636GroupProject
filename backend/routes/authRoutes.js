
const express = require('express');
const { registerUser, loginUser, updateUserProfile, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);
// 🔔 New: Get user notifications by user ID
router.get('/users/:id/notifications', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('notifications');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
