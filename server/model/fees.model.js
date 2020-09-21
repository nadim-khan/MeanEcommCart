const mongoose = require('mongoose');

const FeesSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
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