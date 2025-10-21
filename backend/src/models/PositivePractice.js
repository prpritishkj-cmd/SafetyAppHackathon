const mongoose = require('mongoose');

const positivePracticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['innovation', 'best_practice', 'improvement', 'recognition'],
        required: true
    },
    implementedBy: {
        name: String,
        employeeId: String,
        department: String
    },
    benefits: {
        type: String,
        required: true
    },
    location: String,
    projectId: {
        type: String,
        required: true
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    canBeReplicated: {
        type: Boolean,
        default: true
    },
    costSaving: Number,
    photos: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('PositivePractice', positivePracticeSchema);