const mongoose = require('mongoose');

const haltedWorkSchema = new mongoose.Schema({
    workDescription: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    unsafeConditions: {
        type: String,
        required: true
    },
    haltedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    haltedDate: {
        type: Date,
        required: true
    },
    resumedDate: {
        type: Date
    },
    correctiveActionsTaken: {
        type: String
    },
    projectId: {
        type: String,
        required: true
    },
    estimatedLoss: {
        type: Number // in currency
    },
    status: {
        type: String,
        enum: ['halted', 'resumed', 'cancelled'],
        default: 'halted'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('HaltedWork', haltedWorkSchema);