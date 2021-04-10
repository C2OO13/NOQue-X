const router = require('express').Router();
const questionController = require('../controllers/questionController');

router.post('/:classroomId', questionController.addQuestions);

router.get('/:questionId/info', questionController.getQuestionDetails);

router.get('/:questionId/responses', questionController.getQuestionResponses);

router.get('/:classroomId/stats/:date', questionController.getQuestionsStats);

module.exports = router;
