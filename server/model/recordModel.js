const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        max: 100,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Record', recordSchema);