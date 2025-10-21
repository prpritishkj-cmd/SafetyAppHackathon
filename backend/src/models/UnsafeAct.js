const mongoose = require('mongoose');

const unsafeActSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'Severity is required']
    },
    correctiveAction: {
        type: String,
        required: [true, 'Corrective action is required']
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'closed'],
        default: 'open'
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    images: [{
        type: String // URLs of uploaded images
    }],
    followUpDate: {
        type: Date
    },
    resolvedDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UnsafeAct', unsafeActSchema);