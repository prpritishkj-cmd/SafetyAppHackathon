const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['near_miss', 'property_damage', 'environmental', 'security', 'other'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    witnesses: [{
        name: String,
        contact: String
    }],
    immediateActions: {
        type: String,
        required: true
    },
    rootCause: String,
    preventiveMeasures: String,
    investigationStatus: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
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
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        required: true
    },
    photos: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Incident', incidentSchema);