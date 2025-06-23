
// routes/qna.js
const express = require('express');
const router = express.Router();
const qnaController = require('../controllers/qna');

router.get('/', qnaController.getAllQuestions);
router.post('/', qnaController.askQuestion);

module.exports = router;

