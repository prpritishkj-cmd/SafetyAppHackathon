const mongoose = require('mongoose');

const warningSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['warning', 'advisory'],
        required: true
    },
    recipientName: {
        type: String,
        required: true
    },
    recipientId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        required: true
    },
    correctiveAction: {
        type: String,
        required: true
    },
    deadline: {
        type: Date
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    acknowledged: {
        type: Boolean,
        default: false
    },
    acknowledgedDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Warning', warningSchema);