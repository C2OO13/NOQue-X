const router = require('express').Router();
const questionController = require('../controllers/questionController');

router.post('/:meetId', questionController.addQuestions);

router.get('/:meetId/:date', questionController.getQuestionDetails);

module.exports = router;
