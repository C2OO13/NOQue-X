const router = require('express').Router();
const authRoutes = require('./authRoutes');
const classroomRoutes = require('./classroomRoutes');
const responseRoutes = require('./responseRoutes');
const questionRoutes = require('./questionRoutes');

router.use('/auth', authRoutes);

router.use('/classes', classroomRoutes);

router.use('/responses', responseRoutes);

router.use('/questions', questionRoutes);

module.exports = router;
