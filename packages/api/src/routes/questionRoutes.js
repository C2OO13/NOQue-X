const router = require('express').Router();
const questionController = require('../controllers/questionController');

router.post('/:meetId', questionController.addQuestions);

module.exports = router;
