const mongoose = require('mongoose');

const PaymentsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: false
    },
    updatedBy: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});


module.exports = mongoose.model('Payments', PaymentsSchema);