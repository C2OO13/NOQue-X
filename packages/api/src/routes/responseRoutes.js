const router = require('express').Router();
const responseController = require('../controllers/responseController');

router.patch('/:questionId', responseController.setResponse);
module.exports = router;
