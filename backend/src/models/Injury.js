const mongoose = require('mongoose');

const injurySchema = new mongoose.Schema({
    injuredPerson: {
        name: {
            type: String,
            required: true
        },
        employeeId: {
            type: String,
            required: true
        },
        age: Number,
        department: String
    },
    injuryType: {
        type: String,
        required: true
    },
    bodyPart: {
        type: String,
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
    treatmentGiven: {
        type: String,
        required: true
    },
    firstAidBy: {
        type: String,
        required: true
    },
    referredToHospital: {
        type: Boolean,
        default: false
    },
    hospitalName: String,
    dateTime: {
        type: Date,
        required: true
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
    daysLost: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Injury', injurySchema);