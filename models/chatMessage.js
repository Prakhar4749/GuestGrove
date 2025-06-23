// models/ChatMessage.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Avoid OverwriteModelError
module.exports = mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatSchema);
