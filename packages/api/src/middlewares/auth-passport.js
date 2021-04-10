const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User');

const GoogleAuthCallback = async (
  _accessToken,
  _refreshToken,
  profile,
  done
) => {
  try {
    const user = await User.findOne({ googleId: profile.id });
    // existing user with googleId
    if (user) {
      return done(undefined, user);
    }

    // user does not exist then create a new user
    console.log(`user doesn't exists`);
    const newUser = new User({
      name: profile.displayName,
      googleId: profile.id,
      picture: profile._json.picture,
      email: profile._json.email,
    });

    const savedUser = newUser.save();
    return done(undefined, savedUser);
  } catch (err) {
    return done(err, false);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    GoogleAuthCallback
  )
);
