const UnsafeAct = require('../models/UnsafeAct');
const SafetyTalk = require('../models/SafetyTalk');
const InductionSession = require('../models/InductionSession');
const Warning = require('../models/Warning');
const HaltedWork = require('../models/HaltedWork');
const Injury = require('../models/Injury');
const Incident = require('../models/Incident');
const PositivePractice = require('../models/PositivePractice');

// ====== UNSAFE ACTS CONTROLLERS ======

// @desc    Create unsafe act report
// @route   POST /api/safety/unsafe-acts
// @access  Private
exports.createUnsafeAct = async (req, res) => {
    try {
        const unsafeAct = await UnsafeAct.create({
            ...req.body,
            reportedBy: req.user.id,
            projectId: req.user.projectId
        });

        res.status(201).json({
            success: true,
            message: 'Unsafe act reported successfully',
            data: unsafeAct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating unsafe act report',
            error: error.message
        });
    }
};

// @desc    Get all unsafe acts
// @route   GET /api/safety/unsafe-acts
// @access  Private
exports.getUnsafeActs = async (req, res) => {
    try {
        const { status, severity, projectId, startDate, endDate } = req.query;
        
        // Build filter object
        const filter = {};
        if (status) filter.status = status;
        if (severity) filter.severity = severity;
        if (projectId) filter.projectId = projectId;
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        const unsafeActs = await UnsafeAct.find(filter)
            .populate('reportedBy', 'name employeeId')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: unsafeActs.length,
            data: unsafeActs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching unsafe acts',
            error: error.message
        });
    }
};

// ====== SAFETY TALKS CONTROLLERS ======

// @desc    Create safety talk record
// @route   POST /api/safety/talks
// @access  Private
exports.createSafetyTalk = async (req, res) => {
    try {
        const safetyTalk = await SafetyTalk.create({
            ...req.body,
            recordedBy: req.user.id,
            projectId: req.user.projectId
        });

        res.status(201).json({
            success: true,
            message: 'Safety talk recorded successfully',
            data: safetyTalk
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating safety talk record',
            error: error.message
        });
    }
};

// @desc    Get all safety talks
// @route   GET /api/safety/talks
// @access  Private
exports.getSafetyTalks = async (req, res) => {
    try {
        const { projectId, startDate, endDate } = req.query;
        
        const filter = {};
        if (projectId) filter.projectId = projectId;
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const safetyTalks = await SafetyTalk.find(filter)
            .populate('recordedBy', 'name employeeId')
            .sort('-date');

        res.status(200).json({
            success: true,
            count: safetyTalks.length,
            data: safetyTalks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching safety talks',
            error: error.message
        });
    }
};

// ====== POSITIVE PRACTICES CONTROLLERS ======

// @desc    Create positive practice
// @route   POST /api/safety/positive-practices
// @access  Private
exports.createPositivePractice = async (req, res) => {
    try {
        const practice = await PositivePractice.create({
            ...req.body,
            reportedBy: req.user.id,
            projectId: req.user.projectId
        });

        res.status(201).json({
            success: true,
            message: 'Positive practice recorded successfully',
            data: practice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating positive practice',
            error: error.message
        });
    }
};