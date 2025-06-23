// controllers/qna.js
const Question = require('../models/question');

module.exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.render('qna', { questions });
    } catch (err) {
        res.status(500).send('Error loading questions');
    }
};

module.exports.askQuestion = async (req, res) => {
    const { username, question } = req.body;
    try {
        await Question.create({ username, question });
        res.redirect('/qna');
    } catch (err) {
        res.status(500).send('Failed to submit question');
    }
};