const mongoose = require('mongoose');

const inductionSessionSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in hours
        required: true
    },
    contractor: {
        type: String,
        required: true
    },
    attendanceCount: {
        type: Number,
        required: true,
        min: 1
    },
    topics: [{
        type: String
    }],
    conductedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    certificateIssued: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('InductionSession', inductionSessionSchema);