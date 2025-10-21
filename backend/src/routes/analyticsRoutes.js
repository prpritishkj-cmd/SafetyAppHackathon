const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Dashboard statistics - available to all authenticated users
router.get('/dashboard', analyticsController.getDashboardStats);

// Officer performance - restricted to supervisors and admins
router.get('/officer-performance/:officerId',
    authorize('supervisor', 'admin'),
    analyticsController.getOfficerPerformance);

// Project analysis - available to all authenticated users
router.get('/project/:projectId', analyticsController.getProjectAnalysis);

module.exports = router;