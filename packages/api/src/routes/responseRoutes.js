const router = require('express').Router();
const responseController = require('../controllers/responseController');

router.get('/:questionId', responseController.getResponses);

router.patch('/:userId/:questionId', responseController.setResponse);
module.exports = router;
