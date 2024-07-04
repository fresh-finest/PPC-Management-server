const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Test = mongoose.model('Test', testSchema);
module.exports = Test;