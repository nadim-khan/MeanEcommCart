const mongoose = require('mongoose');

const BroadcastSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});


module.exports = mongoose.model('Broadcast', BroadcastSchema);