const UnsafeAct = require('../models/UnsafeAct');
const SafetyTalk = require('../models/SafetyTalk');
const InductionSession = require('../models/InductionSession');
const Warning = require('../models/Warning');
const HaltedWork = require('../models/HaltedWork');
const Injury = require('../models/Injury');
const Incident = require('../models/Incident');
const PositivePractice = require('../models/PositivePractice');

// @desc    Get dashboard statistics
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboardStats = async (req, res) => {
    try {
        const projectId = req.user.projectId;
        
        // Get counts for each module
        const [
            unsafeCount,
            talksCount,
            inductionsCount,
            warningsCount,
            haltedCount,
            injuriesCount,
            incidentsCount,
            positiveCount
        ] = await Promise.all([
            UnsafeAct.countDocuments({ projectId }),
            SafetyTalk.countDocuments({ projectId }),
            InductionSession.countDocuments({ projectId }),
            Warning.countDocuments({ projectId }),
            HaltedWork.countDocuments({ projectId }),
            Injury.countDocuments({ projectId }),
            Incident.countDocuments({ projectId }),
            PositivePractice.countDocuments({ projectId })
        ]);

        // Calculate safety score
        const totalIssues = unsafeCount + warningsCount + haltedCount + injuriesCount + incidentsCount;
        const totalPositive = positiveCount + talksCount + inductionsCount;
        const safetyScore = totalPositive > 0 
            ? Math.round((totalPositive / (totalPositive + totalIssues)) * 100)
            : 0;

        res.status(200).json({
            success: true,
            data: {
                unsafe: unsafeCount,
                talks: talksCount,
                inductions: inductionsCount,
                warnings: warningsCount,
                halted: haltedCount,
                injuries: injuriesCount,
                incidents: incidentsCount,
                positive: positiveCount,
                safetyScore,
                totalActivities: unsafeCount + talksCount + inductionsCount + 
                               warningsCount + haltedCount + injuriesCount + 
                               incidentsCount + positiveCount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics',
            error: error.message
        });
    }
};

// @desc    Get officer performance
// @route   GET /api/analytics/officer-performance/:officerId
// @access  Private
exports.getOfficerPerformance = async (req, res) => {
    try {
        const { officerId } = req.params;
        const { startDate, endDate } = req.query;

        const dateFilter = {};
        if (startDate || endDate) {
            dateFilter.createdAt = {};
            if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
            if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
        }

        // Get all activities by the officer
        const [
            unsafeReports,
            talksRecorded,
            inductionsConducted,
            warningsIssued,
            positivePractices
        ] = await Promise.all([
            UnsafeAct.countDocuments({ reportedBy: officerId, ...dateFilter }),
            SafetyTalk.countDocuments({ recordedBy: officerId, ...dateFilter }),
            InductionSession.countDocuments({ conductedBy: officerId, ...dateFilter }),
            Warning.countDocuments({ issuedBy: officerId, ...dateFilter }),
            PositivePractice.countDocuments({ reportedBy: officerId, ...dateFilter })
        ]);

        const performanceScore = (
            (unsafeReports * 2) + 
            (talksRecorded * 3) + 
            (inductionsConducted * 3) + 
            (warningsIssued * 1) + 
            (positivePractices * 4)
        );

        res.status(200).json({
            success: true,
            data: {
                officerId,
                activities: {
                    unsafeReports,
                    talksRecorded,
                    inductionsConducted,
                    warningsIssued,
                    positivePractices
                },
                performanceScore,
                rating: performanceScore > 100 ? 'Excellent' :
                       performanceScore > 70 ? 'Good' :
                       performanceScore > 40 ? 'Average' : 'Needs Improvement'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching officer performance',
            error: error.message
        });
    }
};

// @desc    Get project safety analysis
// @route   GET /api/analytics/project/:projectId
// @access  Private
exports.getProjectAnalysis = async (req, res) => {
    try {
        const { projectId } = req.params;
        
        // Get monthly trends
        const currentMonth = new Date();
        currentMonth.setDate(1);
        currentMonth.setHours(0, 0, 0, 0);

        const monthlyData = await Promise.all([
            UnsafeAct.find({
                projectId,
                createdAt: { $gte: currentMonth }
            }),
            Incident.find({
                projectId,
                createdAt: { $gte: currentMonth }
            })
        ]);

        // Calculate severity distribution
        const severityDistribution = await UnsafeAct.aggregate([
            { $match: { projectId } },
            { $group: {
                _id: '$severity',
                count: { $sum: 1 }
            }}
        ]);

        res.status(200).json({
            success: true,
            data: {
                projectId,
                currentMonthUnsafeActs: monthlyData[0].length,
                currentMonthIncidents: monthlyData[1].length,
                severityDistribution,
                trend: 'improving' // Calculate based on historical data
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching project analysis',
            error: error.message
        });
    }
};

module.exports = exports;