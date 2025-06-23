
// controllers/chat.js
const ChatMessage = require('../models/ChatMessage');

module.exports.getChat = async (req, res) => {
    try {
        const messages = await ChatMessage.find().sort({ createdAt: 1 });
        res.render('chat', { messages });
    } catch (err) {
        res.status(500).send('Error loading chat messages');
    }
};

module.exports.sendMessage = async (req, res) => {
    const { sender, message } = req.body;
    try {
        await ChatMessage.create({ sender, message });
        res.redirect('/chat');
    } catch (err) {
        res.status(500).send('Failed to send message');
    }
};

