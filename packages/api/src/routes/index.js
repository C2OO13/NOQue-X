const router = require('express').Router();
const authRoutes = require('./authRoutes');
const classroomRoutes = require('./classroomRoutes');
const responseRoutes = require('./responseRoutes');
const questionRoutes = require('./questionRoutes');
const auth = require('../middlewares/auth');

router.use('/auth', authRoutes);

router.use('/classes', auth, classroomRoutes);

router.use('/responses', auth, responseRoutes);

router.use('/questions', auth, questionRoutes);

module.exports = router;
