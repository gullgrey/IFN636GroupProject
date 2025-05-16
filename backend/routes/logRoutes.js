const express = require('express');
const logger = require('../utils/logger');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const info = logger.getLoggerInfo();
        logger.info('Accessed /api/logs endpoint', { user: req.user ? req.user.id : 'anonymous' });
        res.json(info);
    } catch (error) {
        logger.error('Error fetching logs for API', { errorMessage: error.message });
        res.status(500).json({ message: ' Failed to retrieve log information.'});
    }
});

module.exports = router;