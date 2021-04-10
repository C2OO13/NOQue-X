const router = require('express').Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');
const generateToken = require('../middlewares/generateToken');
const passport = require('passport');
const { CLIENT_URL } = require('../config');

const passportGoogle = passport.authenticate('google', {
  session: false,
  failureRedirect: CLIENT_URL,
});

/**
 * @desc    Auth with google
 * @route   GET /api/auth/google
 * @access  public
 */
router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })
);

/**
 * @desc    Google auth callback
 * @route   GET /api/auth/google/callback
 * @access  public
 */
router.get('/google/callback', passportGoogle, generateToken);

router.get('/check-auth', auth, authController.checkAuth);

router.get('/:token', authController.login);

module.exports = router;
