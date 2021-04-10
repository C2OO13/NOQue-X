const router = require('express').Router();
const classController = require('../controllers/classController');

router.get('/', classController.getAllClasses);

router.post('/', classController.createClass);

router.get('/access/:meetId', classController.checkAdminAccess);

router.get('/:classId/info', classController.getClassInfo);

router.get('/:classId/students', classController.getAllStudents);

router.patch('/:classId/students', classController.addStudents);

router.patch('/:classId/student', classController.addAStudent);

module.exports = router;
