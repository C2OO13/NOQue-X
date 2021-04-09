const router = require('express').Router();
const classController = require('../controllers/classController');

router.get('/:adminId', classController.getAllClasses);

router.post('/:adminId', classController.createClass);


module.exports = router;
