const express = require('express');
const router = express.Router();
const safetyController = require('../controllers/safetyController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Unsafe Acts routes
router.route('/unsafe-acts')
    .get(safetyController.getUnsafeActs)
    .post(safetyController.createUnsafeAct);

// Safety Talks routes
router.route('/talks')
    .get(safetyController.getSafetyTalks)
    .post(safetyController.createSafetyTalk);

// Positive Practices routes
router.route('/positive-practices')
    .post(safetyController.createPositivePractice);

// Add more routes for other modules...

module.exports = router;