const router = require('express').Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.get('/check-auth', auth, authController.checkAuth);

router.get('/:token', authController.login);

module.exports = router;
