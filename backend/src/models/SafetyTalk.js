const mongoose = require('mongoose');

const safetyTalkSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: [true, 'Topic is required']
    },
    presenter: {
        type: String,
        required: [true, 'Presenter name is required']
    },
    attendanceCount: {
        type: Number,
        required: [true, 'Attendance count is required'],
        min: 1
    },
    attendees: [{
        name: String,
        employeeId: String,
        signature: String
    }],
    keyPoints: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SafetyTalk', safetyTalkSchema);