const axios = require('axios');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

exports.checkAuth = (req, res) => {
  return res.status(StatusCodes.OK).json({ data: req.user });
};

exports.login = async (req, res) => {
  const token = req.params.token;
  const URL = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`;
  try {
    const { data } = await axios.get(URL);
    // check for existing user
    let user = await User.findOne({ googleId: data.id });
    if (!user) {
      console.log(`user doesn't exist`);
      user = new User({
        googleId: data.id,
        email: data.email,
        name: data.name,
        picture: data.picture,
      });
      await user.save();
    }
    const userData = {
      _id: user._id,
      googleId: user.googleId,
      name: user.name,
      picture: user.picture,
    };
    // create new JWT token
    const token = jwt.sign(userData, process.env.JWT_TOKEN_SECRET, {
      expiresIn: '7h',
    });
    return res.status(StatusCodes.OK).json({
      data: {
        user: userData,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong' });
  }
};
