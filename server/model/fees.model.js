const mongoose = require('mongoose');

const FeesSchema = new mongoose.Schema({
    subscription: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});


module.exports = mongoose.model('Fees', FeesSchema);